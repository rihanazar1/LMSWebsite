const {clerkClient} = require('@clerk/express')

//Middleware (Protect Educator Routes)

module.exports.protectEducator = async (req, res, next) => {
    try{
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)

        if(response.publicMetadata.role !== 'educator'){
            return res.json({success: false, message: 'Unauthorized Access'})
        }

        next()

    }catch(error){
        res.json({success: false, message: error.message})
    }
}