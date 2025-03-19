const express = require('express')
const { updateRoleToEducator, addCourse, getEducatorCourses, educatorDashboardData, getEnrolledStudentsData } = require('../controllers/educator.controller')
const upload = require('../services/multer.service')
const { protectEducator } = require('../middlewares/auth.middleware')
const educatorRoutes = express.Router()

//Add Educator Role
educatorRoutes.get('/update-role', updateRoleToEducator) 
educatorRoutes.post('/add-course', upload.single('image'), protectEducator, addCourse)
educatorRoutes.get('/courses', protectEducator, getEducatorCourses)
educatorRoutes.get('/dashboard', protectEducator, educatorDashboardData)
educatorRoutes.get('/enrolled-students', protectEducator, getEnrolledStudentsData)

module.exports = educatorRoutes 