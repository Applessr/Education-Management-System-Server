const express = require('express');
const courseController = require('../controllers/courseController');
const authenticate = require('../middlewares/authentication');


const courseRouter = express.Router()
// http://localhost:8888/course

courseRouter.get('/all-course', courseController.getAllCourse)
courseRouter.get('/all-course/:courseId', courseController.getCourseById)

//employee
courseRouter.post('/employee/create-course',authenticate, courseController.createCourse)

module.exports = courseRouter;