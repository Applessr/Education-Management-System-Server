const { faculty } = require("../configs/prisma");
const courseServices = require("../services/courseServices");
const createError = require("../utils/create-error");

const courseController = {};

courseController.getAllCourse = async (req, res, next) => {
    try {
        const { searchTerm } = req.query;

        const { semester } = req.body;

        const allCourse = await courseServices.getAllCourse(searchTerm, semester);

        res.status(200).json(allCourse);
    } catch (error) {
        console.log("Error from getAllCourse", error);
        next(error);
    }
};
courseController.getAllMajor = async (req, res, next) => {
    try {
        const allMajor = await courseServices.getAllMajor();

        res.status(200).json(allMajor);
    } catch (error) {
        console.log("Error from getAllMajor", error);
        next(error);
    }
};
courseController.getMajorByFaculty = async (req, res, next) => {
    try {
        const { facultyId } = req.params;
        const allMajor = await courseServices.getMajorByFaculty(facultyId);

        res.status(200).json(allMajor);
    } catch (error) {
        console.log("Error from getMajorByFaculty", error);
        next(error);
    }
};
courseController.getAllFaculty = async (req, res, next) => {
    try {
        const allFaculty = await courseServices.getAllFaculty();

        res.status(200).json(allFaculty);
    } catch (error) {
        console.log("Error from getAllFaculty", error);
        next(error);
    }
};
courseController.teacherGetCourse = async (req, res, next) => {
    try {
        const teacherId = req.user.id;
        if (!teacherId) {
            return createError(400, "teacherId is require");
        }

        const { employeeRole } = req.user;
        if (employeeRole !== "TEACHER") {
            return createError(400, "You do not have permission");
        }

        const teacherCourse = await courseServices.teacherGetCourse(teacherId);

        res.status(200).json(teacherCourse);
    } catch (error) {
        console.log("Error from teacherGetCourse", error);
        next(error);
    }
};
courseController.getCourseById = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const course = await courseServices.getCourseById(courseId);
        if(!course) {
            return createError(404, 'this course does not exist')
        }

        res.status(200).json(course);
    } catch (error) {
        console.log("Error from getCourseById", error);
        next(error);
    }
};
courseController.createCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user;
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, "You do not have permission");
        }

        const {
            courseCode,
            courseName,
            credits,
            seat,
            section,
            teacherId,
            courseSyllabusId,
            majorId,
            classSchedules,
            examSchedule,
        } = req.body;
        if (
            !(courseCode && courseName && credits && seat && section && teacherId)
        ) {
            return createError(400, "All important fields is require");
        }

        const isCourseCodeExist = await courseServices.findCourseByCode(
            courseCode,
            section
        );
        if (isCourseCodeExist) {
            return createError(400, "this course and section is already exist");
        }

        const newCourse = await courseServices.createCourse(
            courseCode,
            courseName,
            credits,
            seat,
            section,
            teacherId,
            courseSyllabusId,
            majorId,
            classSchedules,
            examSchedule
        );

        res.status(201).json(newCourse);
    } catch (error) {
        console.log("Error from createCourse", error);
        next(error);
    }
};

courseController.editCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user;
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, "You do not have permission");
        }
        const { courseId } = req.params;
        
        const {
            courseCode,
            courseName,
            credits,
            seat,
            section,
            teacherId,
            courseSyllabusId,
            classSchedules,  // Added
            examSchedule    // Added
        } = req.body;

        // Check if at least one field is being updated
        if (
            !(courseCode ||
            courseName ||
            credits ||
            seat ||
            section ||
            teacherId ||
            courseSyllabusId ||
            classSchedules ||  // Added
            examSchedule)      // Added
        ) {
            return createError(400, "at least one field is required to change");
        }

        // Check if course exists
        const isCourseExist = await courseServices.getCourseById(courseId);
        if (!isCourseExist || isCourseExist.length === 0) {
            return createError(400, "this course does not exist");
        }

        const updateCourseInfo = {};
        if (courseCode) updateCourseInfo.courseCode = courseCode;
        if (courseName) updateCourseInfo.courseName = courseName;
        if (credits) updateCourseInfo.credits = credits;
        if (seat) updateCourseInfo.seat = seat;
        if (section) updateCourseInfo.section = section;
        if (teacherId) updateCourseInfo.teacherId = teacherId;
        if (courseSyllabusId) updateCourseInfo.courseSyllabusId = courseSyllabusId;
        if (classSchedules) updateCourseInfo.classSchedules = classSchedules;  // Added
        if (examSchedule) updateCourseInfo.examSchedule = examSchedule;        // Added

        const editCourse = await courseServices.editCourse(
            courseId,
            updateCourseInfo
        );

        res.status(200).json(editCourse);
    } catch (error) {
        console.log("Error from editCourse", error);
        next(error);
    }
};

courseController.inactiveCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user;
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, "You do not have permission");
        }
        const { courseId } = req.params;

        const isCourseCodeExist = await courseServices.getCourseById(courseId);

        console.log(isCourseCodeExist);
        if (!isCourseCodeExist) {
            return createError(400, "this course is not exist");
        }
        if (isCourseCodeExist.status === false) {
            return createError(400, "This course is already inactive");
        }

        const inactive = await courseServices.inactiveCourse(courseId);

        res.status(200).json({ message: "Course Inactive successful" });
    } catch (error) {
        console.log("Error from inactiveCourse", error);
        next(error);
    }
};
courseController.activeCourse = async (req, res, next) => {
    try {
        const { employeeRole } = req.user;
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, "You do not have permission");
        }
        const { courseId } = req.params;

        const isCourseCodeExist = await courseServices.getCourseById(courseId);
        if (!isCourseCodeExist) {
            return createError(400, "this course is not exist");
        }
        if (isCourseCodeExist.status === true) {
            return createError(400, "This course is already active");
        }

        const inactive = await courseServices.activeCourse(courseId);

        res.status(200).json({ message: "Course active successful" });
    } catch (error) {
        console.log("Error from activeCourse", error);
        next(error);
    }
};
courseController.studentGetCourseSyllabus = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        console.log(req.user);
        if (!studentId) {
            return createError(400, "Check token expired date");
        }

        const courseSyllabus = await courseServices.studentGetCourseSyllabus(
            studentId
        );

        res.status(200).json(courseSyllabus);
    } catch (error) {
        console.log("Error from studentGetCourseSyllabus", error);
        next(error);
    }
};
courseController.studentGetEnrollCourse = async (req, res, next) => {
    try {
        const studentId = req.user.id;

        if (!studentId) {
            return createError(400, "Check token expired date");
        }

        const enrollCourse = await courseServices.studentGetEnrollCourse(studentId);

        res.status(200).json(enrollCourse);
    } catch (error) {
        console.log("Error from studentGetEnrollCourse", error);
        next(error);
    }
};
courseController.studentGetEnrollCourseBySemester = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        if (!studentId) {
            return createError(400, "Check token expired date");
        }

        const { semester } = req.body;
        if (!semester) {
            return createError(400, "semester is require");
        }

        const enrollCourse = await courseServices.studentGetEnrollCourseBySemester(
            studentId,
            semester
        );

        res.status(200).json(enrollCourse);
    } catch (error) {
        console.log("Error from studentGetEnrollCourseBySemester", error);
        next(error);
    }
};
courseController.studentGetClassScheduleBySemester = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        if (!studentId) {
            return createError(400, "Check token expired date");
        }

        const { semester } = req.query;
        if (!semester) {
            return createError(400, 'semester is require')
        }

        const classSchedule =
            await courseServices.studentGetClassScheduleBySemester(
                studentId,
                semester
            );

        res.status(200).json(classSchedule);
    } catch (error) {
        console.log("Error from studentGetEnrollCourseBySemester", error);
        next(error);
    }
};
courseController.studentCreateEnroll = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        if (!studentId) {
            return createError(400, "Check token expired date");
        }

        const { semester, courseId } = req.body;
        if (!semester && !courseId) {
            return createError(400, "all fields is require");
        }

        const enrollCourse = await courseServices.studentCreateEnroll(
            studentId,
            semester,
            courseId
        );

        res.status(200).json(enrollCourse);
    } catch (error) {
        console.log("Error from studentCreateEnroll", error);
        next(error);
    }
};
courseController.studentCancelEnroll = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        if (!studentId) {
            return createError(400, "Check token expired date");
        }

        const { enrollmentId } = req.params;
        if (!enrollmentId) {
            return createError(400, "enrollmentId is require");
        }

        const cancelEnroll = await courseServices.studentCancelEnroll(enrollmentId);

        res.status(200).json({ message: "cancel enrollment success" });
    } catch (error) {
        console.log("Error from studentCancelEnroll", error);
        next(error);
    }
};

courseController.studentGetClassScheduleByCourseId = async (req, res, next) => {
    try {
        const studentId = req.user.id;
        if (!studentId) {
            return createError(400, "Check token expired date");
        }

        const { courseCode } = req.params;
        if (!courseCode) {
            return createError(400, "courseCode is require");
        }

        const viewSchedule = await courseServices.studentGetClassScheduleByCourseId(
            courseCode
        );

        res.status(200).json(viewSchedule);
    } catch (error) {
        console.log("Error from studentCancelEnroll", error);
        next(error);
    }
    
};
courseController.assignToSyllabus = async (req, res, next) => {
    try {
        const { employeeRole } = req.user;
        if (employeeRole !== "ADMIN" && employeeRole !== "TEACHER") {
            return createError(400, "You do not have permission");
        }

        const { courseId, majorId, year, recommendationType } = req.body;
        if (!(courseId && majorId && year && recommendationType)) {
            return createError(400, "All fields are required");
        }

        const result = await courseServices.assignToSyllabus(
            courseId,
            majorId,
            year,
            recommendationType
        );

        res.status(200).json(result);
    } catch (error) {
        console.log("Error from assignToSyllabus", error);
        next(error);
    }
};

module.exports = courseController;
