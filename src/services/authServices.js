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
authServices.findStudentById = async (studentId) => {
    return await authModels.findStudentById(studentId)
};
authServices.findEmployeeGoogleId = async (googleId) => {
    return await authModels.findGoogleId(googleId)
};
authServices.createEmployee = async (data) => {
    return await authModels.CreateEmployee(data)
};
authServices.updateEmployee = async (id, data) => {
    return await authModels.updateEmployee(id, data)
};
authServices.updateResetPassword = async (email, token, expiryDate) => {
    return await authModels.updateResetPassword(email, token, expiryDate)
};
authServices.updateStudentPassword = async (studentId, hashedPassword) => {
    return await authModels.updateStudentPassword(studentId, hashedPassword)
};
authServices.updateEmployeePassword = async (employeeId, hashedPassword) => {
    return await authModels.updateEmployeePassword(employeeId, hashedPassword)
};
authServices.currentUser = async (userId, firstName) => {
    return await authModels.currentUser(userId, firstName)
};

module.exports = authServices;