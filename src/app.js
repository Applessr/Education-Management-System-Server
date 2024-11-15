const express = require("express");
const cors = require("cors");
const notFoundHandler = require("./middlewares/not-found");
const handlerError = require("./middlewares/error");
const authRouter = require("./routes/authRoute");
const adminRouter = require("./routes/adminRoute");
const studentRouter = require("./routes/studentRoute");
const teacherRouter = require("./routes/teacherRoute");
const courseRouter = require("./routes/courseRoute");
const gradeRouter = require("./routes/gradeRoute");
const authenticate = require("./middlewares/authentication");
const morgan = require("morgan");
const limiter = require("./middlewares/limiter");
const { swaggerUi, specs } = require("./configs/swagger");

const app = express();
app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/auth", authRouter);

app.use("/student",limiter.studentLimiter, authenticate, studentRouter);

app.use("/teacher",limiter.employeeLimiter, authenticate, teacherRouter);

app.use("/admin",limiter.employeeLimiter, authenticate, adminRouter);

app.use("/course", courseRouter);

app.use("/grade", authenticate, gradeRouter);

app.use("*", notFoundHandler);
app.use(handlerError);

module.exports = app;
