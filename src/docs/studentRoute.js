/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student APIs
 */

/**
 * @swagger
 * /student/profile:
 *   get:
 *     summary: Get student profile
 *     description: Retrieve student profile information including adviser and major details.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success - Returns the student's profile information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 phone:
 *                   type: string
 *                   example: "1234567890"
 *                 adviser:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "Jane"
 *                     lastName:
 *                       type: string
 *                       example: "Smith"
 *                     email:
 *                       type: string
 *                       example: "jane.smith@school.edu"
 *                     phone:
 *                       type: string
 *                       example: "0987654321"
 *                 major:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Computer Science"
 *                     faculty:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Faculty of Engineering"
 *       400:
 *         description: Bad Request - Token expired or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       404:
 *         description: Not Found - Student not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from student getProfile"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /student/credit:
 *   get:
 *     summary: Get student's course credits
 *     description: Retrieve the student's approved course credits, including total, required, elective, and selection credits.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success - Returns the student's course credit details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentCredit:
 *                   type: integer
 *                   example: 30
 *                 totalRequiredCredits:
 *                   type: integer
 *                   example: 72
 *                 totalOptionalCredits:
 *                   type: integer
 *                   example: 48
 *                 totalSelectionCredits:
 *                   type: integer
 *                   example: 24
 *                 totalCredit:
 *                   type: integer
 *                   example: 144
 *                 enrolledRequiredCredits:
 *                   type: integer
 *                   example: 24
 *                 enrolledElectiveCredits:
 *                   type: integer
 *                   example: 10
 *                 enrolledSelectionCredits:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Bad Request - Token expired or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from student getProgress"
 */

/**
 * @swagger
 * /student/notification:
 *   get:
 *     summary: Get student notifications
 *     description: Retrieve notifications for the student's approved courses, including announcements and course details.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success - Returns a list of notifications for the student's approved courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   course:
 *                     type: object
 *                     properties:
 *                       courseCode:
 *                         type: string
 *                         example: "CS101"
 *                       courseName:
 *                         type: string
 *                         example: "Introduction to Computer Science"
 *                       teacher:
 *                         type: object
 *                         properties:
 *                           email:
 *                             type: string
 *                             example: "teacher@example.com"
 *                           firstName:
 *                             type: string
 *                             example: "Alice"
 *                           lastName:
 *                             type: string
 *                             example: "Johnson"
 *                       major:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Computer Science"
 *                           faculty:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Faculty of Engineering"
 *                       announcements:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             title:
 *                               type: string
 *                               example: "Exam Schedule"
 *                             content:
 *                               type: string
 *                               example: "The final exam will be held on December 10th."
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: "2024-11-15T08:30:00Z"
 *       400:
 *         description: Bad Request - Token expired or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       404:
 *         description: Not Found - No notifications found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No notification found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from student getNotification"
 */

/**
 * @swagger
 * /student/exam-date:
 *   get:
 *     summary: Get exam dates for the student
 *     description: Retrieve exam schedules for the specified semester for the student.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: semester
 *         required: true
 *         schema:
 *           type: string
 *           example: "1/2024"
 *         description: The semester for which to retrieve the exam dates.
 *     responses:
 *       200:
 *         description: Success - Returns a list of exam schedules for the specified semester.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   courseId:
 *                     type: integer
 *                     example: 101
 *                   startTime:
 *                     type: string
 *                     format: time
 *                     example: "09:00:00"
 *                   endTime:
 *                     type: string
 *                     format: time
 *                     example: "12:00:00"
 *                   teacher:
 *                     type: string
 *                     example: "John Doe"
 *       400:
 *         description: Bad Request - Token expired or semester is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid semester format"
 *       404:
 *         description: Not Found - No exam schedule found for the semester.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No exam dates found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from student getExamDate"
 */


/**
 * @swagger
 * /student/change-password:
 *   post:
 *     summary: Change student's password
 *     description: Allows a student to change their password by providing their current password, new password, and confirmation of the new password.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newPassword123"
 *               confirmPassword:
 *                 type: string
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Success - Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "password change successfully"
 *       400:
 *         description: Bad Request - Missing fields, passwords do not match, or other validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields are required"
 *       404:
 *         description: Not Found - User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from student change password"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /student/config:
 *   get:
 *     summary: Get configuration for Stripe
 *     description: Retrieve the Stripe publishable key for student payments.
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Success - Returns the Stripe publishable key.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 publishableKey:
 *                   type: string
 *                   example: "pk_test_12345abcdefg"
 *       500:
 *         description: Internal Server Error - Failed to retrieve configuration.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from sendRequestChange"
 */

/**
 * @swagger
 * /student/check-payment:
 *   get:
 *     summary: Check if the student has made a payment for the semester
 *     description: Retrieve the payment details for a student in a specific semester.
 *     tags: [Student]
 *     parameters:
 *       - in: query
 *         name: semester
 *         required: true
 *         schema:
 *           type: string
 *           example: "1/2024"
 *         description: The semester for which to check payment status.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success - Returns the student's payment details for the specified semester.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 totalCredit:
 *                   type: integer
 *                   example: 144
 *                 amount:
 *                   type: integer
 *                   example: 5000
 *                 semester:
 *                   type: string
 *                   example: "1/2024"
 *                 status:
 *                   type: string
 *                   enum: [PENDING, COMPLETED, FAILED]
 *                   example: "COMPLETED"
 *       400:
 *         description: Bad Request - Missing or invalid semester query parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Semester is required"
 *       404:
 *         description: Not Found - No payment found for the specified semester.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No payment found for this semester"
 *       500:
 *         description: Internal Server Error - Failed to retrieve payment details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from checkPayment"
 */

/**
 * @swagger
 * /student/create-payment-intent:
 *   post:
 *     summary: Create a payment intent for a student
 *     description: Create a payment intent for the student with the specified amount and semester for processing payments using Stripe.
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The amount to be charged for the payment intent.
 *                 example: 5000
 *               semester:
 *                 type: string
 *                 description: The semester for which the payment is being made.
 *                 example: "1/2024"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success - Returns the client secret for the payment intent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *                   example: "pi_1G0u5l2eZvKYlo2ClOX1hGxx_secret_L0ehqg7o6A"
 *       400:
 *         description: Bad Request - Invalid `amount` or missing `semester`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid amount"
 *       500:
 *         description: Internal Server Error - Failed to create payment intent.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from createPayment"
 */

/**
 * @swagger
 * /student/pay-tuition-fee:
 *   post:
 *     summary: Create a payment for tuition fee
 *     description: This endpoint allows a student to pay their tuition fee for a specific semester.
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The amount to be paid for the tuition fee (greater than 0).
 *                 example: 10000.50
 *               semester:
 *                 type: string
 *                 description: The semester for which the payment is made.
 *                 example: "2024-1"
 *               status:
 *                 type: string
 *                 enum:
 *                   - "PENDING"
 *                   - "COMPLETED"
 *                   - "FAILED"
 *                 description: The status of the payment.
 *                 example: "PENDING"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Payment successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique ID of the created payment record.
 *                   example: 1
 *                 totalCredit:
 *                   type: integer
 *                   description: The number of credits for the payment.
 *                   example: 3
 *                 amount:
 *                   type: number
 *                   format: float
 *                   description: Amount of the payment.
 *                   example: 10000.50
 *                 semester:
 *                   type: string
 *                   description: Semester of the payment.
 *                   example: "2024-1"
 *                 status:
 *                   type: string
 *                   description: The payment status.
 *                   example: "PENDING"
 *                 payDate:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the payment was made.
 *                   example: "2024-11-15T10:00:00Z"
 *       400:
 *         description: Bad Request - Invalid amount or missing semester.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid amount"
 *       500:
 *         description: Internal Server Error - Failed to create payment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from createPayment"
 */