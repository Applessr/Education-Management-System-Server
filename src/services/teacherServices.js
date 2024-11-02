const teacherModels = require("../models/teacherModels");

const teacherServices = {};

teacherServices.teacherProfile = async (teacherId) => {
    return await teacherModels.teacherProfile(teacherId)
};
teacherServices.changePassword = async (teacherId, newPassword) => {
    return await teacherModels.changePassword(teacherId, newPassword)
}
teacherServices.getStudentInCourse = async (teacherId) => {
    return await teacherModels.getStudentInCourse(teacherId)
}
teacherServices.getConsultedStudent = async (teacherId) => {
    return await teacherModels.getConsultedStudent(teacherId)
}
teacherServices.getSectionRequest = async (teacherId) => {
    return await teacherModels.getSectionRequest(teacherId)
}
teacherServices.sendRequestChange = async (teacherId, fieldToChange, newValue) => {
    return await teacherModels.sendRequestChange(teacherId, fieldToChange, newValue)
}
teacherServices.sendAnnounce = async (teacherId, title, content, courseId) => {
    return await teacherModels.sendAnnounce(teacherId, title, content, courseId)
}
module.exports = teacherServices;