const adminModels = require("../models/adminModels");

const adminServices = {};

adminServices.getEmployeeEmail = async (email) => {
    return await adminModels.findEmail(email)
};

adminServices.getEmployeeById = async (userId) => {
    return await adminModels.findEmployeeByID(userId)
};
adminServices.overAll = async () => {
    return await adminModels.overAll()
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
adminServices.findStudentCode = async (studentCode) => {
    return await adminModels.findStudentCode(studentCode)
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

adminServices.changeStudentStatus = async (studentId, status) => {
    return await adminModels.changeStudentStatus(studentId, status)
};

adminServices.changeStudentInfo = async (studentId, updatedData) => {
    return await adminModels.changeStudentInfo(studentId, updatedData)
};

adminServices.changeEmployeeInfo = async (employeeId, updatedData) => {
    return await adminModels.changeEmployeeInfo(employeeId, updatedData)
};

adminServices.inactiveEmployee = async (employeeId) => {
    return await adminModels.inactiveEmployee(employeeId)
};
adminServices.activeEmployee = async (employeeId) => {
    return await adminModels.activeEmployee(employeeId)
};

module.exports = adminServices;

