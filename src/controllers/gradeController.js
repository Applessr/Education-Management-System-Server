const gradeServices = require("../services/gradeServices");
const createError = require("../utils/create-error");

const gradeController = {};

gradeController.studentGetGrade = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    if (!studentId) {
      return createError(400, "Check token expired date");
    }

    const studentGrade = await gradeServices.studentGetGrade(studentId);

    res.status(200).json(studentGrade);
  } catch (error) {
    console.log("Error from studentGetGrade", error);
    next(error);
  }
};
gradeController.studentGetAllGrade = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    if (!studentId) {
      return createError(400, "Check token expired date");
    }

    const studentGrade = await gradeServices.studentGetAllGrade(studentId);

    res.status(200).json(studentGrade);
  } catch (error) {
    console.log("Error from studentGetAllGrade", error);
    next(error);
  }
};
gradeController.studentGetGradeBySemester = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    if (!studentId) {
      return createError(400, "Check token expired date");
    }

    const { semester } = req.body;
    if (!semester) {
      return createError(400, "semester is require");
    }

    const studentGrade = await gradeServices.studentGetGradeBySemester(
      studentId,
      semester
    );

    res.status(200).json(studentGrade);
  } catch (error) {
    console.log("Error from studentGetGradeBySemester", error);
    next(error);
  }
};
gradeController.studentGetScore = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    if (!studentId) {
      return createError(400, "Check token expired date");
    }

    const { courseId } = req.params;
    if (!courseId) {
      return createError(400, "courseId is require");
    }

    const studentScore = await gradeServices.studentGetScore(studentId,courseId);

    res.status(200).json(studentScore);
  } catch (error) {
    console.log("Error from studentGetScore", error);
    next(error);
  }
};
gradeController.studentGetAllGPA = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    if (!studentId) {
      return createError(400, "Check token expired date");
    }

    const AllTermGPA = await gradeServices.studentGetAllGPA(studentId);
    res.status(200).json({ AllTermGPA });
  } catch (error) {
    console.log("Error from studentGetAverageGPA", error);
    next(error);
  }
};
gradeController.studentGetGPABySemester = async (req, res, next) => {
  try {
    const studentId = req.user.id;
    if (!studentId) {
      return createError(400, "Check token expired date");
    }

    const studentGPA = await gradeServices.studentGetGPABySemester(studentId);

    res.status(200).json({ GPA: studentGPA });
  } catch (error) {
    console.log("Error from studentGetGPABySemester", error);
    next(error);
  }
};
gradeController.teacherAddScore = async (req, res, next) => {
  try {
    const { employeeRole } = req.user;
    if (employeeRole !== "TEACHER") {
      return res.status(400).json({ error: "You do not have permission" });
    }

    const { courseId } = req.params;
    const { semester, studentId, type, point } = req.body;
    if (!(courseId && semester && studentId && type && point)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedTotalScore = await gradeServices.teacherAddScore(
      studentId,
      courseId,
      semester,
      type,
      point
    );

    res.status(200).json({
      message: "Score added successfully",
      updatedTotalScore: updatedTotalScore,
    });
  } catch (error) {
    console.log("Error from teacherAddScore:", error);
    next(error);
  }
};
gradeController.teacherEditScore = async (req, res, next) => {
  try {
    const { employeeRole } = req.user;
    if (employeeRole !== "TEACHER") {
      return res.status(400).json({ error: "You do not have permission" });
    }

    const { componentId } = req.params;
    if (!componentId) {
      return createError(400, "componentId is require");
    }
    const { type, point } = req.body;
    if (!(type || point)) {
      return res
        .status(400)
        .json({ error: "At least one field is require change" });
    }

    const updatedData = {};
    if (type) {
      updatedData.type = type;
    }
    if (point) {
      updatedData.point = point;
    }

    const editScore = await gradeServices.teacherEditScore(
      componentId,
      updatedData
    );

    res.status(200).json({
      message: "Score edit successfully",
      updatedTotalScore: editScore,
    });
  } catch (error) {
    console.log("Error from teacherAddScore:", error);
    next(error);
  }
};

module.exports = gradeController;
