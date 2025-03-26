const express = require('express')
const { getUserData, userEnrolledCourses, purchaseCourse, updateUserCourseProgress, getUserCourseProgress, addUserRating } = require('../controllers/user.controller')
const userRouter = express.Router()

userRouter.get('/data', getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourses)
userRouter.post('/purchase', purchaseCourse)
userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/get-course-progress', getUserCourseProgress) 
userRouter.post('/add-rating', addUserRating) 


module.exports = userRouter 