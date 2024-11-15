const request = require("supertest");
const app = require("../../src/app"); 
const teacherServices = require("../../src/services/teacherServices");
const hashServices = require("../../src/services/hashServices");
const createError = require("../../src/utils/create-error");
const jwtServices = require("../../src/services/jwtServices");

jest.mock("../../src/services/teacherServices");
jest.mock("../../src/services/hashServices");

describe("teacherController", () => {
    let mockToken, mockTeacherId, mockTeacherInfo;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        
        mockTeacherId = 1;
        mockTeacherInfo = { id: mockTeacherId, name: "Teacher Name", password: "hashedPassword" };
        mockToken =  jwtServices.sign({ id: mockTeacherId, type: 'EMPLOYEE' });
        mockWrongToken =  jwtServices.sign({ id: mockTeacherId, type: 'STUDENT' });
    });

    describe("getProfile", () => {
        it("should return teacher profile when teacherId is valid", async () => {
            teacherServices.teacherProfile.mockResolvedValue(mockTeacherInfo);

            const res = await request(app)
                .get("/teacher/profile")
                .set("Authorization", `Bearer ${mockToken}`)
                .send();

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockTeacherInfo);
        });

        it("should return 400 if teacherId is missing", async () => {
            teacherServices.teacherProfile.mockResolvedValue(null);

            const res = await request(app)
                .get("/teacher/profile")
                .set("Authorization", `Bearer ${mockToken}`)
                .send();

            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe('Account not found');
        });
    });

    describe("getStudentInCourse", () => {
        it("should return list of students in course for a valid teacher", async () => {
            const mockStudents = [{ id: 1, name: "Student One" }];
            teacherServices.getStudentInCourse.mockResolvedValue(mockStudents);

            const res = await request(app)
                .get("/teacher/student-course")
                .set("Authorization", `Bearer ${mockToken}`)
                .send();

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockStudents);
        });

        it("should return 400 if user is not a teacher", async () => {
            const res = await request(app)
                .get("/teacher/student-course")
                .set("Authorization", `Bearer ${mockWrongToken}`)
                .send();

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("You do not have permission");
        });
    });

    describe("sendAnnounce", () => {
        it("should send announcement if all fields are provided", async () => {
            const announcementData = { title: "Test Title", content: "Test Content", studentId: 1 };
            teacherServices.sendAnnounce.mockResolvedValue({ message: "Announcement sent" });

            const res = await request(app)
                .post("/teacher/send-announce")
                .set("Authorization", `Bearer ${mockToken}`)
                .send(announcementData);

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("Announcement sent");
        });

        it("should return 400 if required fields are missing", async () => {
            const res = await request(app)
                .post("/teacher/send-announce")
                .set("Authorization", `Bearer ${mockToken}`)
                .send({ title: "Test Title" });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("All field is require");
        });
    });
});