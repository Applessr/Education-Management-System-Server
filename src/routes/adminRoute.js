const express = require('express');
const adminController = require('../controllers/adminController');
const { registerEmployeeValidator, registerStudentValidator } = require('../middlewares/validator');

const adminRouter = express.Router()

adminRouter.post('/register-employee', registerEmployeeValidator, adminController.registerEmployee)
adminRouter.post('/register-student', registerStudentValidator, adminController.registerStudent)

adminRouter.get('/profile', adminController.getSelfProfile)
adminRouter.get('/student', adminController.getAllStudent)
adminRouter.get('/employee', adminController.getAllEmployee)
adminRouter.get('/student/:studentId', adminController.getStudentById)
adminRouter.get('/employee/:employeeId', adminController.getAllEmployee)

module.exports = adminRouter;