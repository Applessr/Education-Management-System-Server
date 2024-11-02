const courseModels = require("../models/courseModels");


const courseServices = {};


courseServices.getAllCourse = async(searchTerm) => {
    return await courseModels.getAllCourse(searchTerm)
};
courseServices.getCourseById = async(courseId) => {
    return await courseModels.getCourseById(courseId)
};
courseServices.getCourseByCode = async(courseCode) => {
    return await courseModels.getCourseByCode(courseCode)
};
courseServices.findCourseByCode = async(courseCode, section) => {
    return await courseModels.findCourseByCode(courseCode, section)
};
courseServices.createCourse = async(courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId) => {
    return await courseModels.createCourse(courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId)
};
courseServices.editCourse = async(courseId, updateCourseInfo) => {
    return await courseModels.editCourse(courseId, updateCourseInfo)
};
courseServices.inactiveCourse = async(courseId) => {
    return await courseModels.inactiveCourse(courseId)
};
courseServices.activeCourse = async(courseId) => {
    return await courseModels.activeCourse(courseId)
};
courseServices.studentGetCourseSyllabus = async(studentId) => {
    return await courseModels.studentGetCourseSyllabus(studentId)
};


module.exports = courseServices;