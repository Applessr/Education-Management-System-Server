const courseModels = require("../models/courseModels");


const courseServices = {};


courseServices.getAllCourse = async() => {
    return await courseModels.getAllCourse()
};
courseServices.getCourseById = async(courseId) => {
    return await courseModels.getCourseById(courseId)
};
courseServices.createCourse = async(courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId) => {
    return await courseModels.createCourse(courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId)
};


module.exports = courseServices;