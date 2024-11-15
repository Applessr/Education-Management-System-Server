const request = require("supertest");
const app = require("../../src/app");
const { prisma } = require("../../src/configs/prisma");

jest.mock("../../src/services/courseServices");
const courseServices = require("../../src/services/courseServices");
const jwtServices = require("../../src/services/jwtServices");
const courseController = require("../../src/controllers/courseController");
const createError = require("../../src/utils/create-error");

describe("courseController", () => {
    let req, res, next;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();

        mockTeacherId = 1;
        mockTeacherInfo = { id: mockTeacherId, name: "Teacher Name", password: "hashedPassword" };
        mockToken = jwtServices.sign({ id: mockTeacherId, type: 'EMPLOYEE' });
        mockStudentId = 1;
        mockStudentInfo = { id: mockTeacherId, name: "Teacher Name", password: "hashedPassword" };
        mockStudentToken = jwtServices.sign({ id: mockTeacherId, type: 'STUDENT' });
    });
    describe("GET /courses", () => {
        it("should return all courses", async () => {
            const mockCourses = [
                { id: 1, courseCode: "CS101", courseName: "Intro to CS" },
                { id: 2, courseCode: "CS102", courseName: "Data Structures" },
            ];
            courseServices.getAllCourse.mockResolvedValue(mockCourses);

            const response = await request(app).get("/course/all-course");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCourses);
        });

        it("should handle errors in getAllCourse", async () => {
            courseServices.getAllCourse.mockRejectedValue(new Error("Database error"));

            const response = await request(app).get("/course/all-course");

            expect(response.status).toBe(500);
            expect(response.body.message).toBe("Database error");
        });
    });

    describe("POST /courses", () => {
        it("should create a new course", async () => {
            const newCourse = {
                courseCode: "CS201",
                courseName: "Algorithms",
                credits: 3,
                seat: 30,
                section: 1,
                teacherId: 1,
            };
            courseServices.createCourse.mockResolvedValue(newCourse);

            const response = await request(app)
                .post("/course/employee/create-course")
                .send(newCourse)
                .set("Authorization", `Bearer ${mockToken}`)

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newCourse);
        });

        it("should return 400 if required fields are missing", async () => {
            const response = await request(app)
                .post("/course/employee/create-course")
                .send({ courseName: "Algorithms" })
                .set("Authorization", `Bearer ${mockToken}`)

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("All important fields is require");
        });
    });

    describe("GET /courses/:courseId", () => {
        it("should return course by id", async () => {
            const course = { id: 1, courseCode: "CS101", courseName: "Intro to CS" };
            courseServices.getCourseById.mockResolvedValue(course);

            const response = await request(app).get("/course/single-course/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(course);
        });

        it("should return 404 if course is not found", async () => {
            courseServices.getCourseById.mockResolvedValue(null);

            const response = await request(app).get("/course/single-course/999");

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("this course does not exist");
        });
    });

    describe("PUT /courses/:courseId", () => {
        it("should update an existing course", async () => {
            const updatedCourse = {
                courseName: "Updated Course Name",
                credits: 4,
            };

            courseServices.getCourseById = jest.fn().mockResolvedValue({ id: 1, courseName: "Old Course Name", credits: 3 });
            courseServices.editCourse = jest.fn().mockResolvedValue(updatedCourse);

            const response = await request(app)
                .patch("/course/employee/edit-course/1")
                .send(updatedCourse)
                .set("Authorization", `Bearer ${mockToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedCourse);
        });

        it("should return 400 if no fields to update are provided", async () => {
            const response = await request(app)
                .patch("/course/employee/edit-course/999")
                .send({})
                .set("Authorization", `Bearer ${mockToken}`)

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("at least one field is required to change");
        });
    });

    describe("DELETE /courses/:courseId", () => {
        it("should deactivate a course", async () => {
            courseServices.getCourseById.mockResolvedValue({ id: 1, status: true });
            courseServices.inactiveCourse.mockResolvedValue({ message: "Course Inactive successful" });
        
            const response = await request(app)
                .patch("/course/employee/inactive-course/1")
                .set("Authorization", `Bearer ${mockToken}`);  
        
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Course Inactive successful");
        });
    });

    describe("getMajorByFaculty", () => {
        it("should retrieve all majors for a specific faculty by faculty ID", async () => {
            const req = { params: { facultyId: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();

            courseServices.getMajorByFaculty = jest.fn().mockResolvedValue([{ id: 1, name: "Computer Science" }]);

            await courseController.getMajorByFaculty(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Computer Science" }]);
        });

    });

    describe("getAllFaculty", () => {
        it("should retrieve all faculties", async () => {
            courseServices.getAllFaculty.mockResolvedValue([{ id: 1, name: "Engineering" }]);

            await courseController.getAllFaculty(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Engineering" }]);
        });

        it("should handle errors gracefully", async () => {
            const error = new Error("Error");
            courseServices.getAllFaculty.mockRejectedValue(error);

            await courseController.getAllFaculty(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("teacherGetCourse", () => {
        it("should retrieve courses for a teacher", async () => {
            req.user = { id: 1, employeeRole: "TEACHER" };
            courseServices.teacherGetCourse.mockResolvedValue([{ id: 1, courseName: "Math 101" }]);

            await courseController.teacherGetCourse(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, courseName: "Math 101" }]);
        });

        it("should return error if user is not a teacher", async () => {
            const error = new Error("You do not have permission");
            error.statusCode = 400;
    
            try {
                await courseController.teacherGetCourse(req, res, next);
            } catch (e) {
                expect(e.statusCode).toBe(400);
                expect(e.message).toBe("You do not have permission");
                expect(next).toHaveBeenCalledWith(e);
            }
        });
    });

    describe("studentGetEnrollCourse", () => {
        it("should retrieve all enrolled courses for a student", async () => {
            req.user = { id: 1 };
            courseServices.studentGetEnrollCourse.mockResolvedValue([{ id: 1, courseName: "Math 101" }]);

            await courseController.studentGetEnrollCourse(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ id: 1, courseName: "Math 101" }]);
        });
    });

    describe("inactiveCourse", () => {
        it("should inactivate a course", async () => {
            req.user = { id: 1, employeeRole: "ADMIN" };
            req.params = { courseId: 1 };  
            courseServices.getCourseById.mockResolvedValue({ id: 1, status: true });
            courseServices.inactiveCourse.mockResolvedValue({ message: "Course Inactive successful" });
    
            await courseController.inactiveCourse(req, res, next);
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Course Inactive successful" });
        });
    
    });

    describe("activeCourse", () => {
        it("should activate a course", async () => {
            const req = {
                user: { id: 1, employeeRole: "ADMIN" },
                params: { courseId: 1 }
            };
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };
    
            const next = jest.fn();
    
            courseServices.getCourseById.mockResolvedValue({ id: 1, status: false });
            courseServices.activeCourse.mockResolvedValue({ message: "Course active successful" });
    
            await courseController.activeCourse(req, res, next);
    
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Course active successful" });
        });
    });

});
