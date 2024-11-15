const gradeModels = require("../models/gradeModels");

const gradeServices = {};

gradeServices.studentGetGrade = async (studentId) => {
  return await gradeModels.studentGetGrade(studentId);
};
gradeServices.studentGetAllGrade = async (studentId) => {
  return await gradeModels.studentGetAllGrade(studentId);
};
gradeServices.studentGetGradeBySemester = async (studentId, semester) => {
  return await gradeModels.studentGetGradeBySemester(studentId, semester);
};
gradeServices.studentGetScore = async (studentId, courseId) => {
  return await gradeModels.studentGetScore(studentId, courseId);
};
gradeServices.studentGetAllGPA = async (studentId) => {
  return await gradeModels.studentGetAllGPA(studentId);
};
gradeServices.studentGetGPABySemester = async (studentId) => {
  return await gradeModels.studentGetGPABySemester(studentId);
};
gradeServices.teacherAddScore = async (studentId, courseId, semester, type, point) => {
  return await gradeModels.teacherAddScore(studentId, courseId, semester, type, point);
};
gradeServices.teacherEditScore = async (componentId, updatedData) => {
  return await gradeModels.teacherEditScore(componentId, updatedData);
};

module.exports = gradeServices;
