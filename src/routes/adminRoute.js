const express = require('express');
const adminController = require('../controllers/adminController');
const { registerEmployeeValidator, registerStudentValidator } = require('../middlewares/validator');

const adminRouter = express.Router()
//http://localhost:8888/admin
adminRouter.post('/register-employee', registerEmployeeValidator, adminController.registerEmployee)
adminRouter.post('/register-student', registerStudentValidator, adminController.registerStudent)
//admin
adminRouter.get('/profile', adminController.getSelfProfile);
adminRouter.get('/over-all', adminController.overAll);
adminRouter.get('/course-syllabus/:majorId', adminController.courseSyllabus);

//student
adminRouter.get('/student', adminController.getAllStudent)
adminRouter.get('/student/:studentId', adminController.getStudentById)

adminRouter.patch('/student-status/:studentId', adminController.changeStudentStatus)// adminRouter.patch('/student-change-info', adminController.changeStudentInfo)
adminRouter.patch('/student-change-info/:studentId', adminController.changeStudentInfo)
//employee
adminRouter.get('/teacher', adminController.getAllEmployee)
adminRouter.get('/teacher/:teacherId', adminController.getEmployeeById)

adminRouter.patch('/employee-change-info/:employeeId', adminController.changeEmployeeInfo)
// adminRouter.patch('/employee-active', adminController.activeEmployee)
// adminRouter.patch('/employee-inactive', adminController.inactiveEmployee)
adminRouter.patch('/employee-active/:employeeId', adminController.activeEmployee)
adminRouter.patch('/employee-inactive/:employeeId', adminController.inactiveEmployee)
//request
adminRouter.get('/request', adminController.getRequestInfo)
adminRouter.get('/request/:requestId', adminController.getRequestInfoById)


module.exports = adminRouter;