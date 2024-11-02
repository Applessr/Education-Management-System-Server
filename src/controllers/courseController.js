const courseServices = require("../services/courseServices");
const createError = require("../utils/create-error");

const courseController = {};

courseController.getAllCourse = async (req, res, next) => {
    try {

        const allCourse = await courseServices.getAllCourse();

        res.status(200).json(allCourse);
    } catch (error) {
        console.log('Error from getAllCourse', error)
        next(error);
    }

};
courseController.getCourseById = async (req, res, next) => {
    try {
        const { courseId } = req.params
        console.log(courseId)

        const course = await courseServices.getCourseById(courseId);

        res.status(200).json(course);
    } catch (error) {
        console.log('Error from getCourseById', error)
        next(error);
    }

};
courseController.createCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }

        const { courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId } = req.body
        if (!(courseCode && courseName && credits && seat && section && teacherId)) {
            return createError(400, 'All important fields is require')
        }
        const newCourse = await courseServices.createCourse(courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId);

        res.status(200).json(newCourse);
    } catch (error) {
        console.log('Error from getCourseById', error)
        next(error);
    }

};
courseController.editCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }

        const { courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId } = req.body
        if (!(courseCode && courseName && credits && seat && section && teacherId)) {
            return createError(400, 'All important fields is require')
        }
        const newCourse = await courseServices.createCourse(courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId);

        res.status(200).json(newCourse);
    } catch (error) {
        console.log('Error from getCourseById', error)
        next(error);
    }

};

module.exports = courseController;
