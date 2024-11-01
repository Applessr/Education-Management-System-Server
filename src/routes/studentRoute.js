const express = require('express');
const studentController = require('../controllers/studentController');


const studentRouter = express.Router()


studentRouter.get('/profile', studentController.getProfile)
studentRouter.post('/change-password', studentController.studentChangePassword)


module.exports = studentRouter;