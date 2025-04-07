const { Webhook } = require('svix');
const User = require('../model/user.model')
const config = require('../config/config');
const Stripe = require('stripe');
const Purchase = require('../model/purchase.model');
const Course = require('../model/course.model'); 

//API Controller Function to manage Clerk User with database

module.exports.clerkWebhooks = async (req, res) => {
    try{
        const whook = new Webhook(config.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id" : req.headers["svix-id"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        },{
            tolerance: 300 // Increase timestamp tolerance (default is 5 minutes, this sets it to 5 minutes)
        })

        const {data, type} = req.body
        // console.log(req.body)

        switch (type) {
            case 'user.created':{
                const userData = {
                    _id : data.id,
                    email : data.email_addresses[0].email_address,
                    name : data.first_name + " " + data.last_name,
                    imageUrl : data.image_url,
                }
                await User.create(userData)
                res.json({})
                break;
            }
                
            case 'user.updated':{
                const userData = {
                    email : data.email_addresses[0].email_address,
                    name : data.first_name + " " + data.last_name,
                    imageUrl : data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted' : {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
        
            default:
                break;
        }

    }catch(error){
        res.json({success: false, message: error.message})
    }
}



const stripeInstance = new Stripe(config.STRIPE_SECRET_KEY);

module.exports.stripeWebhooks = async (request, response)=> {

    console.log("Stripe Webhook Hit");

    const sig = request.headers['stripe-signature'];

    let event;
  
    try {
      event = Stripe.webhooks.constructEvent(request.body, sig, config.STRIPE_WEBHOOK_SECRET);
      console.log("✅ Webhook Verified Successfully");
    }
    catch (err) {
      console.log("❌ Webhook Signature Error:", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':{
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;
      console.log("💰 Payment Successful:", paymentIntentId);

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId
      })

      const {purchaseId} = session.data[0].metadata;

      const purchaseData = await Purchase.findById(purchaseId)
      const userData = await User.findById(purchaseData.userId)
      const courseData = await Course.findById(purchaseData.courseId.toString())

      courseData.enrolledStudents.push(userData)
      await courseData.save()

      userData.enrolledCourses.push(courseData._id)
      await userData.save()

      purchaseData.status = 'completed'
      await purchaseData.save()
      console.log("✅ Purchase Status Updated to Completed");

      break;
    }
    case 'payment_intent.payment_failed':{
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;
    
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId
        })
    
        const {purchaseId} = session.data[0].metadata;
        const purchaseData = await Purchase.findById(purchaseId)
        purchaseData.status = 'faild'
        await purchaseData.save()

      break;}
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  console.log("Received Event:", request.body);
    // Return a response to acknowledge receipt of the event
    response.json({received: true});

}



