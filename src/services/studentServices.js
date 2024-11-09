const studentModels = require("../models/studentModels");

const studentServices = {};

studentServices.getCredit = async (userId) => {
    return await studentModels.getCredit(userId)
};
studentServices.getStudentProfile = async (userId) => {
    return await studentModels.studentProfile(userId)
};
studentServices.getNotification = async (userId) => {
    return await studentModels.getNotification(userId)
};
studentServices.getExamDate = async (userId) => {
    return await studentModels.getExamDate(userId)
};
studentServices.changePassword = async (userId, newPassword) => {
    return await studentModels.changePassword(userId, newPassword)
};
studentServices.sendRequestChange = async (userId, fieldToChange, newValue) => {
    return await studentModels.sendRequestChange(userId, fieldToChange, newValue)
};
studentServices.sendRequestSection = async (userId, courseId, currentSection, newSection, teacherId) => {
    return await studentModels.sendRequestSection(userId, courseId, currentSection, newSection, teacherId)
};
studentServices.checkPayMent = async (semester, studentId) => {
    return await studentModels.checkPayMent(semester, studentId)
};
studentServices.createPayMent = async (amount, semester, studentId) => {
    return await studentModels.createPayMent(amount, semester, studentId)
};
module.exports = studentServices;