const express = require('express');
const authController = require('../controllers/authController');
const { loginEmployeeValidator, loginStudentValidator } = require('../middlewares/validator');

const authRouter = express.Router()

authRouter.post('/login-employee', loginEmployeeValidator, authController.loginEmployee);
authRouter.post('/login-student', loginStudentValidator, authController.loginStudent);

authRouter.post('/login-google', authController.loginGoogle);

authRouter.post('/forget-password', authController.forgetPassword);

authRouter.post('/reset-password', authController.resetPassword);

module.exports = authRouter;