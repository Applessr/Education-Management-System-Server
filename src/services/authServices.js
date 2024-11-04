const authModels = require("../models/authModels");

const authServices = {};

authServices.findEmployee = async (email) => {
    return await authModels.findEmployee(email)
};
authServices.findEmployeeById = async (employeeId) => {
    return await authModels.findEmployeeById(employeeId)
};
authServices.findStudent = async (identifier) => {
    return await authModels.findStudent(identifier)
};
authServices.findStudentById= async (studentId) => {
    return await authModels.findStudentById(studentId)
};
authServices.findEmployeeGoogleId = async (googleId) => {
    return await authModels.findEmployee(googleId)
};
authServices.createEmployee = async (data) => {
    return await authModels.CreateEmployee(data)
};
authServices.findUserByGoogleId = async (googleId) => {
    return await authModels.findEmployee(googleId)
};
authServices.updateEmployee = async (id, data) => {
    return await authModels.updateEmployee(id, data)
};
authServices.updateResetPassword = async (email, token, expiryDate) => {
    return await authModels.updateResetPassword(email, token, expiryDate)
};
authServices.updatePassword = async (employeeId, hashedPassword) => {
    return await authModels.updatePassword(employeeId, hashedPassword)
};
authServices.currentUser = async (userId) => {
    return await authModels.currentUser(userId)
};

module.exports = authServices;