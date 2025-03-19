const Course = require("../model/course.model")
const User = require("../model/user.model")
const config = require("../config/config")
const { default: Stripe } = require("stripe")
const Purchase = require("../model/purchase.model")

//Get User Data 
module.exports.getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)

        if(!user){
            return res.json({success : false , message : 'User Not Found'})
        }
        
        res.json({success : true, user})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Users Enrolled Courses With Lecture Links
module.exports.userEnrolledCourses = async (req, res) => {
    try {
        const userId = req.auth.userId
        const userdata = await User.findById(userId).populate('enrolledCourses')

        res.json({success : true, enrolledCourses : userdata.enrolledCourses })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// Purchase Course

module.exports.purchaseCourse = async (req, res) => {
    try {
        const {courseId} = req.body
        const {origin} = req.headers
        const userId = req.auth.userId
        const userData = await User.findById(userId)
        console.log(userData)
        const courseData  = await Course.findById(courseId)
        console.log(courseData)

        if(!userData || !courseData){
           return res.json({success : false, message: 'Data Not Found' })
        }

        const purchaseData = {
            courseId : courseData._id,
            userId,
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2),
        }

        const newPurchase = await Purchase.create(purchaseData)

        // Stripe Gateway Initialize

        const stripeInstance = new Stripe(config.STRIPE_SECRET_KEY) 

        const currency = config.CURRENCY.toLocaleLowerCase()

        //Creating line items to for Stripe

        const line_items = [{
            price_data: {
                currency,
                product_data:{
                    name: courseData.courseTitle
                },
                unit_amount: Math.floor(newPurchase.amount) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                purchaseId : newPurchase._id.toString()
            }
        })

        res.send({success : true , session_url : session.url})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}