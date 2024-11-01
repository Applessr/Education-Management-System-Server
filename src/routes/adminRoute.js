const express = require('express');
const adminController = require('../controllers/adminController');
const { registerEmployeeValidator, registerStudentValidator } = require('../middlewares/validator');

const adminRouter = express.Router()
//http://localhost:8888/admin
adminRouter.post('/register-employee', registerEmployeeValidator, adminController.registerEmployee)
adminRouter.post('/register-student', registerStudentValidator, adminController.registerStudent)
//admin
adminRouter.get('/profile', adminController.getSelfProfile)

//student
adminRouter.get('/student', adminController.getAllStudent)
adminRouter.get('/student/:studentId', adminController.getStudentById)
//employee
adminRouter.get('/employee', adminController.getAllEmployee)
adminRouter.get('/employee/:employeeId', adminController.getEmployeeById)
//request
adminRouter.get('/request', adminController.getRequestInfo)
adminRouter.get('/request/:requestId', adminController.getRequestInfoById)


module.exports = adminRouter;