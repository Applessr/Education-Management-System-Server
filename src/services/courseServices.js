const courseModels = require("../models/courseModels");

const courseServices = {};

courseServices.getAllCourse = async (searchTerm, semester) => {
  return await courseModels.getAllCourse(searchTerm, semester);
};

courseServices.getAllMajor = async () => {
  return await courseModels.getAllMajor();
};
courseServices.getMajorByFaculty = async (facultyId) => {
  return await courseModels.getMajorByFaculty(facultyId);
};
courseServices.getAllFaculty = async () => {
  return await courseModels.getAllFaculty();
};
courseServices.teacherGetCourse = async (teacherId) => {
  return await courseModels.teacherGetCourse(teacherId);
};
courseServices.getCourseById = async (courseId) => {
  return await courseModels.getCourseById(courseId);
};
courseServices.getCourseByCode = async (courseCode) => {
  return await courseModels.getCourseByCode(courseCode);
};
courseServices.findCourseByCode = async (courseCode, section) => {
  return await courseModels.findCourseByCode(courseCode, section);
};
courseServices.createCourse = async (
  courseCode,
  courseName,
  credits,
  seat,
  section,
  teacherId,
  courseSyllabusId,
  majorId
) => {
  return await courseModels.createCourse(
    courseCode,
    courseName,
    credits,
    seat,
    section,
    teacherId,
    courseSyllabusId,
    majorId
  );
};
courseServices.editCourse = async (courseId, updateCourseInfo) => {
  return await courseModels.editCourse(courseId, updateCourseInfo);
};
courseServices.inactiveCourse = async (courseId) => {
  return await courseModels.inactiveCourse(courseId);
};
courseServices.activeCourse = async (courseId) => {
  return await courseModels.activeCourse(courseId);
};
courseServices.studentGetCourseSyllabus = async (studentId) => {
  return await courseModels.studentGetCourseSyllabus(studentId);
};
courseServices.studentGetEnrollCourse = async (studentId) => {
  return await courseModels.studentGetEnrollCourse(studentId);
};
courseServices.studentGetEnrollCourseBySemester = async (
  studentId,
  semester
) => {
  return await courseModels.studentGetEnrollCourseBySemester(
    studentId,
    semester
  );
};
courseServices.studentGetClassScheduleBySemester = async (
  studentId,
  semester
) => {
  return await courseModels.studentGetClassScheduleBySemester(
    studentId,
    semester
  );
};
courseServices.studentCreateEnroll = async (studentId, semester, courseId) => {
  return await courseModels.studentCreateEnroll(studentId, semester, courseId);
};
courseServices.studentCancelEnroll = async (enrollmentId) => {
  return await courseModels.studentCancelEnroll(enrollmentId);
};

courseServices.studentGetClassScheduleByCourseId = async (courseCode) => {
  return await courseModels.studentGetClassScheduleByCourseId(courseCode);
};

module.exports = courseServices;
