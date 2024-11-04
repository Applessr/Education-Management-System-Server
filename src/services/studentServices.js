const studentModels = require("../models/studentModels");

const studentServices = {};

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
module.exports = studentServices;