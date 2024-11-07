const express = require('express');
const courseController = require('../controllers/courseController');
const authenticate = require('../middlewares/authentication');


const courseRouter = express.Router()
// http://localhost:8888/course

courseRouter.get('/single-course/:courseId', courseController.getCourseById)
courseRouter.get('/all-course', courseController.getAllCourse)
courseRouter.get('/all-major', courseController.getAllMajor)
courseRouter.get('/major/:facultyId', courseController.getMajorByFaculty)
courseRouter.get('/all-faculty', courseController.getAllFaculty)

//employee
courseRouter.get('/teacher', authenticate, courseController.teacherGetCourse)
courseRouter.post('/employee/create-course', authenticate, courseController.createCourse)
courseRouter.patch('/employee/edit-course/:courseId', authenticate, courseController.editCourse)
courseRouter.patch('/employee/inactive-course/:courseId', authenticate, courseController.inactiveCourse)
courseRouter.patch('/employee/active-course/:courseId', authenticate, courseController.activeCourse)

//student
courseRouter.get('/student/course-syllabus', authenticate, courseController.studentGetCourseSyllabus)
courseRouter.get('/student/enroll-course', authenticate, courseController.studentGetEnrollCourse)
courseRouter.get('/student/enroll-course-semester', authenticate, courseController.studentGetEnrollCourseBySemester)
courseRouter.get('/student/class-schedule', authenticate, courseController.studentGetClassScheduleBySemester)

courseRouter.post('/student/enroll-course', authenticate, courseController.studentCreateEnroll)

courseRouter.patch('/student/cancel-course/:enrollmentId', authenticate, courseController.studentCancelEnroll)



module.exports = courseRouter;