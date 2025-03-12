const Webhook = require('svix')
const User = require('../model/user.model')
const config = require('../config/config')

//API Controller Function to manage Clerk User with database

module.exports.clerkWebhooks = async (req, res) => {
    try{
        const whook = new Webhook(config.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id" : req.headers["svix-timestamp"],
            "svix-timestamp" : req.headers["svix-timestamp"],
            "svix-signature" : req.headers["svix-signature"]
        })

        const {data, type} = req.body
        console.log(req.body)

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
                    email : data.email_address[0].email_address,
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