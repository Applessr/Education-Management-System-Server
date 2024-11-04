const express = require('express');
const teacherController = require('../controllers/teacherController');


const teacherRouter = express.Router()
//http://localhost:8888/teacher
teacherRouter.get('/profile', teacherController.getProfile)
teacherRouter.get('/consulted-student', teacherController.getConsultedStudent)
teacherRouter.get('/enroll-request', teacherController.getEnrollRequest)
teacherRouter.get('/student-course', teacherController.getStudentInCourse)
teacherRouter.get('/request-section', teacherController.getSectionRequest)

teacherRouter.post('/request-change', teacherController.sendRequestChange)
teacherRouter.post('/send-announce', teacherController.sendAnnounce)

teacherRouter.patch('/change-password', teacherController.teacherChangePassword)
teacherRouter.patch('/update-enroll-status/:enrollmentId', teacherController.editEnrollStatus)
teacherRouter.patch('/update-request-status/:requestId', teacherController.editRequestSection)
teacherRouter.patch('/update-section/:enrollmentId', teacherController.editStudentSection)




module.exports = teacherRouter;