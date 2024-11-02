const express = require('express');
const studentController = require('../controllers/studentController');


const studentRouter = express.Router()
//http://localhost:8888/student
studentRouter.get('/profile', studentController.getProfile)
studentRouter.get('/notification', studentController.getNotification)

studentRouter.post('/change-password', studentController.studentChangePassword)
studentRouter.post('/request-change', studentController.sendRequestChange)


module.exports = studentRouter;