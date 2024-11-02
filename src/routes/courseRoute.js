const express = require('express');
const courseController = require('../controllers/courseController');
const authenticate = require('../middlewares/authentication');


const courseRouter = express.Router()
// http://localhost:8888/course

courseRouter.get('/single-course/:courseId', courseController.getCourseById)
courseRouter.get('/all-course', courseController.getAllCourse)

//employee
courseRouter.post('/employee/create-course', authenticate, courseController.createCourse)
courseRouter.patch('/employee/edit-course/:courseId', authenticate, courseController.editCourse)
courseRouter.patch('/employee/inactive-course/:courseId', authenticate, courseController.inactiveCourse)
courseRouter.patch('/employee/active-course/:courseId', authenticate, courseController.activeCourse)

//student
courseRouter.get('/student/course-syllabus', authenticate, courseController.studentGetCourseSyllabus)


module.exports = courseRouter;