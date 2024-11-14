const request = require("supertest");
const app = require("../../src/app");
const studentServices = require("../../src/services/studentServices");
const hashServices = require("../../src/services/hashServices");
const jwtServices = require("../../src/services/jwtServices");
const stripe = require("stripe")(process.env.STRPIE_SECRET_KEY);

// Mock services
jest.mock("../../src/services/studentServices", () => ({
    getCredit: jest.fn(),
    getStudentProfile: jest.fn(),
    getNotification: jest.fn(),
    getExamDate: jest.fn(),
    changePassword: jest.fn(),
    sendRequestChange: jest.fn(),
    sendRequestSection: jest.fn(),
    checkPayMent: jest.fn(),
    createPayMent: jest.fn(),
}));

jest.mock("../../src/services/hashServices", () => ({
    compare: jest.fn(),
    hash: jest.fn(),
}));

jest.mock("stripe", () => {
    return jest.fn().mockImplementation(() => ({
        paymentIntents: {
            create: jest.fn(),
        },
    }));
});

describe("studentController", () => {
    const mockUserId = 123;
    const mockToken = jwtServices.sign({ id: mockUserId, type: 'STUDENT' });


    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("GET /student/credit - should get student credit", async () => {
        const mockCredit = { credit: 100 };
        studentServices.getCredit.mockResolvedValue(mockCredit);

        const response = await request(app)
            .get("/student/credit")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCredit);
        expect(studentServices.getCredit).toHaveBeenCalledWith(mockUserId);
    });

    test("GET /student/profile - should get student profile", async () => {
        const mockProfile = { id: mockUserId, name: "John Doe", password: "hashedPassword" };
        studentServices.getStudentProfile.mockResolvedValue(mockProfile);

        const response = await request(app)
            .get("/student/profile")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: mockUserId, name: "John Doe" });
        expect(studentServices.getStudentProfile).toHaveBeenCalledWith(mockUserId);
    });

    test("GET /student/notifications - should get notifications", async () => {
        const mockNotifications = [{ id: 1, message: "New notification" }];
        studentServices.getNotification.mockResolvedValue(mockNotifications);

        const response = await request(app)
            .get("/student/notifications")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockNotifications);
        expect(studentServices.getNotification).toHaveBeenCalledWith(mockUserId);
    });

    test("GET /student/exam-date - should get exam date by semester", async () => {
        const mockExamDate = { date: "2023-12-01" };
        studentServices.getExamDate.mockResolvedValue(mockExamDate);

        const response = await request(app)
            .get("/student/exam-date?semester=1")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockExamDate);
        expect(studentServices.getExamDate).toHaveBeenCalledWith(mockUserId, "1");
    });

    test("POST /student/change-password - should change student password", async () => {
        const mockProfile = { id: mockUserId, password: "hashedPassword" };
        studentServices.getStudentProfile.mockResolvedValue(mockProfile);
        hashServices.compare.mockResolvedValue(true);
        hashServices.hash.mockResolvedValue("newHashedPassword");

        const response = await request(app)
            .post("/student/change-password")
            .send({
                currentPassword: "oldPassword",
                newPassword: "newPassword",
                confirmPassword: "newPassword",
            })
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "password change successfully" });
        expect(studentServices.changePassword).toHaveBeenCalledWith(mockUserId, { password: "newHashedPassword" });
    });

    test("POST /student/send-request-change - should send change request", async () => {
        const mockRequest = { success: true };
        studentServices.sendRequestChange.mockResolvedValue(mockRequest);

        const response = await request(app)
            .post("/student/send-request-change")
            .send({ fieldToChange: "email", newValue: "new@example.com" })
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockRequest);
        expect(studentServices.sendRequestChange).toHaveBeenCalledWith(mockUserId, "email", "new@example.com");
    });

    test("POST /student/send-request-section - should send section change request", async () => {
        const mockRequest = { success: true };
        studentServices.sendRequestSection.mockResolvedValue(mockRequest);

        const response = await request(app)
            .post("/student/send-request-section")
            .send({
                courseId: "123",
                currentSection: "A",
                newSection: "B",
                teacherId: "teacher123",
            })
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockRequest);
        expect(studentServices.sendRequestSection).toHaveBeenCalledWith(mockUserId, "123", "A", "B", "teacher123");
    });

    test("GET /student/check-payment - should check payment", async () => {
        const mockPayment = { amount: 1000 };
        studentServices.checkPayMent.mockResolvedValue(mockPayment);

        const response = await request(app)
            .get("/student/check-payment?semester=1")
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPayment);
        expect(studentServices.checkPayMent).toHaveBeenCalledWith("1", mockUserId);
    });

    test("GET /student/config - should get Stripe config", async () => {
        const response = await request(app).get("/student/config");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ publishableKey: process.env.STRPIE_PUBLISHABLE_KEY });
    });

    test("POST /student/payment-intent - should create payment intent", async () => {
        const mockPaymentIntent = { client_secret: "secret_123" };
        stripe.paymentIntents.create.mockResolvedValue(mockPaymentIntent);

        const response = await request(app)
            .post("/student/payment-intent")
            .send({ amount: 1000, semester: "1" })
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ clientSecret: "secret_123" });
        expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
            amount: 100000,
            currency: "thb",
            metadata: { studentId: mockUserId, semester: "1" },
        });
    });

    test("POST /student/create-payment - should create payment", async () => {
        const mockPayment = { success: true };
        studentServices.createPayMent.mockResolvedValue(mockPayment);

        const response = await request(app)
            .post("/student/create-payment")
            .send({ amount: 1000, semester: "1", status: "PENDING" })
            .set("Authorization", `Bearer ${mockToken}`);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockPayment);
        expect(studentServices.createPayMent).toHaveBeenCalledWith(1000, "1", mockUserId, "PENDING");
    });
});
