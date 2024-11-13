const teacherModels = require("../models/teacherModels");

const teacherServices = {};

teacherServices.teacherProfile = async (teacherId) => {
    return await teacherModels.teacherProfile(teacherId)
};
teacherServices.changePassword = async (teacherId, newPassword) => {
    return await teacherModels.changePassword(teacherId, newPassword)
};
teacherServices.getStudentInCourse = async (teacherId) => {
    return await teacherModels.getStudentInCourse(teacherId)
};
teacherServices.getStudentInCourseById = async (teacherId, courseId) => {
    return await teacherModels.getStudentInCourseById(teacherId, courseId)
};
teacherServices.getConsultedStudent = async (teacherId) => {
    return await teacherModels.getConsultedStudent(teacherId)
};
teacherServices.getEnrollRequest = async (teacherId) => {
    return await teacherModels.getEnrollRequest(teacherId)
};
teacherServices.getSectionRequest = async (teacherId) => {
    return await teacherModels.getSectionRequest(teacherId)
};
teacherServices.sendRequestChange = async (teacherId, fieldToChange, newValue) => {
    return await teacherModels.sendRequestChange(teacherId, fieldToChange, newValue)
};
teacherServices.sendAnnounce = async (teacherId, title, content, courseId) => {
    return await teacherModels.sendAnnounce(teacherId, title, content, courseId)
};
teacherServices.editEnrollStatus = async (enrollmentId, status) => {
    return await teacherModels.editEnrollStatus(enrollmentId, status)
};
teacherServices.editRequestSection = async (requestId, status) => {
    return await teacherModels.editRequestSection(requestId, status)
};
teacherServices.findEnroll = async (enrollmentId) => {
    return await teacherModels.findEnroll(enrollmentId)
};
teacherServices.editStudentSection = async (enrollmentId, courseId) => {
    return await teacherModels.editStudentSection(enrollmentId, courseId)
};
module.exports = teacherServices;