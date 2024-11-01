const adminModels = require("../models/adminModels");

const adminServices = {};

adminServices.getEmployeeEmail = async (email) => {
    return await adminModels.findEmail(email)
};
adminServices.getEmployeeById = async (userId) => {
    return await adminModels.findEmployeeByID(userId)
};
adminServices.getEmployeePhone = async (phone) => {
    return await adminModels.findPhone(phone)
};
adminServices.createEmployee = async (data) => {
    return await adminModels.createEmployee(data)
};

adminServices.getStudentId = async (studentId) => {
    return await adminModels.findStudentId(studentId)
};
adminServices.getStudentEmail = async (email) => {
    return await adminModels.findStudentEmail(email)
};
adminServices.getStudentPhone = async (phone) => {
    return await adminModels.findStudentPhone(phone)
};
adminServices.createStudent = async (data) => {
    return await adminModels.createStudent(data)
};
adminServices.getAllStudent = async () => {
    return await adminModels.getAllStudent()
};
adminServices.getAllEmployee = async () => {
    return await adminModels.getAllEmployee()
};
adminServices.getRequestInfo = async () => {
    return await adminModels.getRequestInfo()
};
adminServices.getRequestInfoById = async (requestId) => {
    return await adminModels.getRequestInfoById(requestId)
};

module.exports = adminServices;

