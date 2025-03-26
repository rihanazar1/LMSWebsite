const Course = require("../model/course.model")
const User = require("../model/user.model")
const config = require("../config/config")
const  Stripe = require("stripe")
const Purchase = require("../model/purchase.model")
const CourseProgress = require("../model/courseProgress.model")

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
        // console.log(userData)
        const courseData  = await Course.findById(courseId)
        // console.log(courseData)

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

        const currency = config.CURRENCY.toLowerCase()

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



// Update User Course Progress
module.exports.updateUserCourseProgress = async (req, res) => {
    try{
        const userId = req.auth.userId
        const {courseId, lectureId} = req.body
        const progressData = await CourseProgress.findOne({userId, courseId})

        if(progressData){
            if(progressData.lectureCompleted.includes(lectureId)){
                return res.json({success: true, message: 'Lecture Already Completed'})
            }

            progressData.lectureCompleted.push(lectureId)
            await progressData.save()

        } else {
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            })
        }

        res.json({success : true, message : 'Progress Updated'})

    }catch(error){
        res.json({success : false, message : error.message})
    }
}


// get User Course Progress 
module.exports.getUserCourseProgress = async (req, res) => {
    try{
        const userId = req.auth.userId
        const {courseId} = req.body
        const progressData = await CourseProgress.findOne({userId, courseId})

        res.json({success : true , progressData})

    }catch(error){

        res.json({success : false, message : error.message})
    }
}

// Add User Rating to Course 

module.exports.addUserRating = async (req, res) => {
    const userId = req.auth.userId
    const {courseId, rating} = req.body

    if(!courseId || !userId || !rating || rating < 1 || rating > 5){
        return res.json({success : false , message: "Invalid Details"})
    }

    try{
        const course = await Course.findById(courseId);

        if(!course){
            return res.json({success: false, message: 'Course not found.'});
        }

        const user = await User.findById(userId);

        if(!user || !user.enrolledCourses.includes(courseId)){
            return res.json({success : false, message: 'User has not purchase this course.'})
        }

        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId)

        if(existingRatingIndex > -1){
            course.courseRatings[existingRatingIndex].rating = rating;
        }else{
            course.courseRatings.push({userId, rating})
        }

        await course.save();

        return res.json({success : true, message : "Rating Added"})
    }catch(error){
       return res.json({success : false , message : error.message})
    }
}