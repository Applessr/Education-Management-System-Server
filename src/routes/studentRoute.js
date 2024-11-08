const express = require('express');
const studentController = require('../controllers/studentController');


const studentRouter = express.Router()
//http://localhost:8888/student
studentRouter.get('/profile', studentController.getProfile)
studentRouter.get('/credit', studentController.getCredit)
studentRouter.get('/notification', studentController.getNotification)
studentRouter.get('/exam-date', studentController.getExamDate)

studentRouter.post('/change-password', studentController.studentChangePassword)
studentRouter.post('/request-change', studentController.sendRequestChange)
studentRouter.post('/request-section', studentController.sendRequestSection)


module.exports = studentRouter;