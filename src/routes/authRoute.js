const express = require("express");
const authController = require("../controllers/authController");
const {
  loginEmployeeValidator,
  loginStudentValidator,
} = require("../middlewares/validator");
const authenticate = require("../middlewares/authentication");

const authRouter = express.Router();

authRouter.post("/login-employee", loginEmployeeValidator, authController.loginEmployee);

authRouter.post("/login-student", loginStudentValidator, authController.loginStudent);

authRouter.post("/login-google", authController.loginGoogle);

authRouter.post("/forget-password", authController.forgetPassword);

authRouter.post("/reset-password", authController.resetPassword);

authRouter.get("/current-user", authenticate, authController.currentUser);

module.exports = authRouter;
