const courseServices = require("../services/courseServices");
const createError = require("../utils/create-error");

const courseController = {};

courseController.getAllCourse = async (req, res, next) => {
    try {

        const { searchTerm } = req.query;

        const allCourse = await courseServices.getAllCourse(searchTerm);

        res.status(200).json(allCourse);
    } catch (error) {
        console.log('Error from getAllCourse', error);
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

        const isCourseCodeExist = await courseServices.findCourseByCode(courseCode, section)
        if (isCourseCodeExist) {
            return createError(400, 'this course and section is already exist')
        }

        const newCourse = await courseServices.createCourse(courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId, majorId);

        res.status(201).json(newCourse);
    } catch (error) {
        console.log('Error from createCourse', error)
        next(error);
    }

};
courseController.editCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }
        const { courseId } = req.params
        const { courseCode, courseName, credits, seat, section, teacherId, courseSyllabusId } = req.body
        if (!(courseCode || courseName || credits || seat || section || teacherId || courseSyllabusId)) {
            return createError(400, 'at least one field is require change')
        }

        const isCourseCodeExist = await courseServices.findCourseByCode(courseCode, section)
        if (!isCourseCodeExist) {
            return createError(400, 'this course and section is not exist')
        }

        const updateCourseInfo = {};
        if (courseCode) {
            updateCourseInfo.courseCode = courseCode;
        }
        if (courseName) {
            updateCourseInfo.courseName = courseName;
        }
        if (credits) {
            updateCourseInfo.credits = credits;
        }
        if (seat) {
            updateCourseInfo.seat = seat;
        }
        if (section) {
            updateCourseInfo.section = section;
        }
        if (teacherId) {
            updateCourseInfo.teacherId = teacherId;
        }
        if (courseSyllabusId) {
            updateCourseInfo.courseSyllabusId = courseSyllabusId;
        }

        const editCourse = await courseServices.editCourse(courseId, updateCourseInfo);

        res.status(200).json(editCourse);
    } catch (error) {
        console.log('Error from editCourse', error)
        next(error);
    }

};
courseController.inactiveCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }
        const { courseId } = req.params

        const isCourseCodeExist = await courseServices.getCourseById(courseId)

        console.log(isCourseCodeExist)
        if (!isCourseCodeExist) {
            return createError(400, 'this course is not exist')
        }
        if (isCourseCodeExist.status === false) {
            return createError(400, 'This course is already inactive')
        }

        const inactive = await courseServices.inactiveCourse(courseId);

        res.status(200).json({ message: "Course Inactive successful" });
    } catch (error) {
        console.log('Error from editCourse', error)
        next(error);
    }

};
courseController.activeCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, 'You do not have permission')
        }
        const { courseId } = req.params

        const isCourseCodeExist = await courseServices.getCourseById(courseId)
        if (!isCourseCodeExist) {
            return createError(400, 'this course is not exist')
        }
        if (isCourseCodeExist.status === true) {
            return createError(400, 'This course is already active')
        }

        const inactive = await courseServices.activeCourse(courseId);

        res.status(200).json({ message: "Course active successful" });
    } catch (error) {
        console.log('Error from editCourse', error)
        next(error);
    }

};
courseController.studentGetCourseSyllabus = async (req, res, next) => {
    try {

        const studentId = req.user.id
        console.log(req.user);
        if (!studentId) {
            return createError(400, 'Check token expired date')
        }

        const courseSyllabus = await courseServices.studentGetCourseSyllabus(studentId)

        res.status(200).json(courseSyllabus);
    } catch (error) {
        console.log('Error from editCourse', error)
        next(error);
    }

};


module.exports = courseController;
