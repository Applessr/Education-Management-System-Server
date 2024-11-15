const express = require("express");
const gradeController = require("../controllers/gradeController");

const gradeRouter = express.Router();
//http://localhost:8888/grade
//student
gradeRouter.get("/student/grade", gradeController.studentGetGrade);
gradeRouter.get("/student/all-grade", gradeController.studentGetAllGrade);
gradeRouter.get("/student/grade-semester", gradeController.studentGetGradeBySemester);
gradeRouter.get("/student/score/:courseId", gradeController.studentGetScore);
gradeRouter.get("/student/GPA/all", gradeController.studentGetAllGPA);
gradeRouter.get("/student/GPA/semester", gradeController.studentGetGPABySemester);

//teacher
gradeRouter.post("/teacher/score/:courseId", gradeController.teacherAddScore);
gradeRouter.patch("/teacher/edit-score/:componentId", gradeController.teacherEditScore);

module.exports = gradeRouter;
