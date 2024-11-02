const prisma = require("../configs/prisma");


const courseModels = {};

courseModels.getAllCourse = async () => {
    return await prisma.course.findMany({})
}
courseModels.getCourseById = async (courseId) => {
    return await prisma.course.findMany({
        where: {
            id: Number(courseId),
        },
    });
};
courseModels.createCourse = async (courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId) => {
    return await prisma.course.create({
        data: {
            courseCode,
            courseName,
            credits,
            seat,
            section,
            teacherId,
            courseSyllabusId,
            majorId
        },
    });
};



module.exports = courseModels;