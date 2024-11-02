const studentModels = require("../models/studentModels");

const studentServices = {};

studentServices.getStudentProfile = async (userId) => {
    return await studentModels.studentProfile(userId)
};
studentServices.getNotification = async (userId) => {
    return await studentModels.getNotification(userId)
};
studentServices.changePassword = async (userId, newPassword) => {
    return await studentModels.changePassword(userId, newPassword)
};
studentServices.sendRequestChange = async (userId, fieldToChange, newValue) => {
    return await studentModels.sendRequestChange(userId, fieldToChange, newValue)
};
module.exports = studentServices;