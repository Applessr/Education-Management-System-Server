const studentModels = require("../models/studentModels");

const studentServices = {};

studentServices.getStudentProfile = async (userId) => {
    return await studentModels.studentProfile(userId)
};
studentServices.changePassword = async (userId, newPassword) => {
    return await studentModels.changePassword(userId, newPassword)
}
module.exports = studentServices;