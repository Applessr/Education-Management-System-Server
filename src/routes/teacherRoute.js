const express = require('express');
const teacherController = require('../controllers/teacherController');


const teacherRouter = express.Router()
//http://localhost:8888/teacher
teacherRouter.get('/profile', teacherController.getProfile)
teacherRouter.get('/consulted-student', teacherController.getConsultedStudent)
teacherRouter.get('/student-course', teacherController.getStudentInCourse)
teacherRouter.get('/request-section', teacherController.getSectionRequest)

teacherRouter.post('/change-password', teacherController.teacherChangePassword)
teacherRouter.post('/request-change', teacherController.sendRequestChange)
teacherRouter.post('/send-announce', teacherController.sendAnnounce)



module.exports = teacherRouter;