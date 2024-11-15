/**
 * @swagger
 * /teacher/profile:
 *   get:
 *     summary: Get profile information of a teacher
 *     description: Fetch the profile details of the teacher, including their major and faculty.
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response - Returns teacher profile information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The teacher's unique ID.
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   description: The teacher's first name.
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   description: The teacher's last name.
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   description: The teacher's email address.
 *                   example: "john.doe@example.com"
 *                 major:
 *                   type: object
 *                   description: The major the teacher is associated with.
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the major.
 *                       example: "Computer Science"
 *                     faculty:
 *                       type: object
 *                       description: The faculty under which the major falls.
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: The name of the faculty.
 *                           example: "Faculty of Engineering"
 *       400:
 *         description: Bad Request - Token expired or missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       404:
 *         description: Not Found - Teacher profile not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account not found"
 *       500:
 *         description: Internal Server Error - An error occurred while fetching the profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from teacher getProfile"
 */

/**
 * @swagger
 * /teacher/consulted-student:
 *   get:
 *     summary: Get students consulted by the teacher
 *     description: Retrieve information about students consulted by the teacher, including gender, status, and GPA.
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response - Returns a list of consulted students along with their information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 students:
 *                   type: array
 *                   description: A list of students consulted by the teacher.
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         description: The student's email.
 *                         example: "student@example.com"
 *                       firstName:
 *                         type: string
 *                         description: The student's first name.
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         description: The student's last name.
 *                         example: "Doe"
 *                       phone:
 *                         type: string
 *                         description: The student's phone number.
 *                         example: "+1234567890"
 *                       student:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: The student's unique ID.
 *                             example: 1
 *                           studentId:
 *                             type: string
 *                             description: The student's ID number.
 *                             example: "S12345678"
 *                           email:
 *                             type: string
 *                             description: The student's email.
 *                             example: "student@example.com"
 *                           firstName:
 *                             type: string
 *                             description: The student's first name.
 *                             example: "John"
 *                           lastName:
 *                             type: string
 *                             description: The student's last name.
 *                             example: "Doe"
 *                           gender:
 *                             type: string
 *                             description: The student's gender.
 *                             example: "MALE"
 *                           status:
 *                             type: string
 *                             description: The student's status (e.g., active, inactive, graduated).
 *                             example: "ACTIVE"
 *                           major:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 description: The name of the student's major.
 *                                 example: "Computer Science"
 *                               faculty:
 *                                 type: object
 *                                 properties:
 *                                   name:
 *                                     type: string
 *                                     description: The name of the faculty.
 *                                     example: "Engineering"
 *                           averageGPA:
 *                             type: number
 *                             format: float
 *                             description: The student's average GPA.
 *                             example: 3.75
 *                           enrollments:
 *                             type: array
 *                             description: List of enrollments for the student.
 *                             items:
 *                               type: object
 *                               properties:
 *                                 semester:
 *                                   type: string
 *                                   description: The semester the student is enrolled in.
 *                                   example: "1/2024"
 *                 genderCount:
 *                   type: object
 *                   description: Count of male and female students.
 *                   properties:
 *                     male:
 *                       type: integer
 *                       description: Number of male students.
 *                       example: 10
 *                     female:
 *                       type: integer
 *                       description: Number of female students.
 *                       example: 5
 *                 totalStudents:
 *                   type: integer
 *                   description: Total number of consulted students.
 *                   example: 15
 *                 statusCount:
 *                   type: object
 *                   description: Count of students by status (active, inactive, graduated).
 *                   properties:
 *                     active:
 *                       type: integer
 *                       description: Number of active students.
 *                       example: 10
 *                     inactive:
 *                       type: integer
 *                       description: Number of inactive students.
 *                       example: 2
 *                     graduated:
 *                       type: integer
 *                       description: Number of graduated students.
 *                       example: 3
 *       400:
 *         description: Bad Request - Invalid token or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: Not Found - Teacher profile not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account not found"
 *       500:
 *         description: Internal Server Error - An error occurred while retrieving the student data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getConsultedStudent"
 */

/**
 * @swagger
 * /teacher/enroll-request:
 *   get:
 *     summary: Get enrollment requests for a teacher's courses
 *     description: Retrieve a list of pending enrollment requests for the courses taught by the teacher, including student details.
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response - Returns a list of pending enrollment requests for the teacher's courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 enrollRequest:
 *                   type: array
 *                   description: List of pending enrollment requests.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The unique ID of the course.
 *                         example: 1
 *                       section:
 *                         type: string
 *                         description: The course section.
 *                         example: "A"
 *                       courseCode:
 *                         type: string
 *                         description: The course code.
 *                         example: "CS101"
 *                       courseName:
 *                         type: string
 *                         description: The course name.
 *                         example: "Introduction to Computer Science"
 *                       enrollments:
 *                         type: array
 *                         description: List of pending enrollments for the course.
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: The unique ID of the enrollment request.
 *                               example: 101
 *                             status:
 *                               type: string
 *                               description: The enrollment status (PENDING).
 *                               example: "PENDING"
 *                             registrationDate:
 *                               type: string
 *                               format: date-time
 *                               description: The date the enrollment request was made.
 *                               example: "2024-01-15T09:00:00Z"
 *                             semester:
 *                               type: string
 *                               description: The semester for which the enrollment is requested.
 *                               example: "1/2024"
 *                             student:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   description: The unique ID of the student.
 *                                   example: 123
 *                                 studentId:
 *                                   type: string
 *                                   description: The student's ID number.
 *                                   example: "S12345678"
 *                                 email:
 *                                   type: string
 *                                   description: The student's email address.
 *                                   example: "student@example.com"
 *                                 firstName:
 *                                   type: string
 *                                   description: The student's first name.
 *                                   example: "John"
 *                                 lastName:
 *                                   type: string
 *                                   description: The student's last name.
 *                                   example: "Doe"
 *                                 phone:
 *                                   type: string
 *                                   description: The student's phone number.
 *                                   example: "+1234567890"
 *                                 major:
 *                                   type: object
 *                                   properties:
 *                                     name:
 *                                       type: string
 *                                       description: The student's major.
 *                                       example: "Computer Science"
 *                                     faculty:
 *                                       type: object
 *                                       properties:
 *                                         name:
 *                                           type: string
 *                                           description: The faculty name.
 *                                           example: "Engineering"
 *       400:
 *         description: Bad Request - Invalid token or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: Not Found - No enrollment requests found for the teacher's courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No enrollment requests found"
 *       500:
 *         description: Internal Server Error - An error occurred while retrieving the enrollment requests.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getEnrollRequest"
 */

/**
 * @swagger
 * /teacher/student-course:
 *   get:
 *     summary: Get students enrolled in the teacher's courses
 *     description: Retrieve a list of students who are enrolled and approved in the courses taught by the teacher, including student details.
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response - Returns a list of students enrolled in the teacher's courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentInCourse:
 *                   type: array
 *                   description: List of students enrolled in the teacher's courses.
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         description: The teacher's email.
 *                         example: "teacher@example.com"
 *                       firstName:
 *                         type: string
 *                         description: The teacher's first name.
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         description: The teacher's last name.
 *                         example: "Doe"
 *                       phone:
 *                         type: string
 *                         description: The teacher's phone number.
 *                         example: "+1234567890"
 *                       courses:
 *                         type: array
 *                         description: List of courses taught by the teacher.
 *                         items:
 *                           type: object
 *                           properties:
 *                             courseCode:
 *                               type: string
 *                               description: The course code.
 *                               example: "CS101"
 *                             courseName:
 *                               type: string
 *                               description: The course name.
 *                               example: "Introduction to Computer Science"
 *                             enrollments:
 *                               type: array
 *                               description: List of approved student enrollments for the course.
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   student:
 *                                     type: object
 *                                     properties:
 *                                       studentId:
 *                                         type: string
 *                                         description: The student's ID.
 *                                         example: "S12345678"
 *                                       email:
 *                                         type: string
 *                                         description: The student's email.
 *                                         example: "student@example.com"
 *                                       firstName:
 *                                         type: string
 *                                         description: The student's first name.
 *                                         example: "Jane"
 *                                       lastName:
 *                                         type: string
 *                                         description: The student's last name.
 *                                         example: "Smith"
 *                                       phone:
 *                                         type: string
 *                                         description: The student's phone number.
 *                                         example: "+9876543210"
 *                                       major:
 *                                         type: object
 *                                         properties:
 *                                           name:
 *                                             type: string
 *                                             description: The student's major.
 *                                             example: "Computer Science"
 *                                           faculty:
 *                                             type: object
 *                                             properties:
 *                                               name:
 *                                                 type: string
 *                                                 description: The faculty name.
 *                                                 example: "Engineering"
 *       400:
 *         description: Bad Request - Invalid token or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: Not Found - No students found for the teacher's courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No students found"
 *       500:
 *         description: Internal Server Error - An error occurred while retrieving the student data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getStudentInCourse"
 */

/**
 * @swagger
 * /teacher/student-course/{courseId}:
 *   get:
 *     summary: Get students enrolled in a specific course
 *     description: Retrieve a list of students who are enrolled and approved in a specific course taught by the teacher, including student details, grades, and class schedule.
 *     tags: [Teacher]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course for which to retrieve student enrollments.
 *         schema:
 *           type: string
 *         example: "1"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response - Returns a list of students enrolled in the specified course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 course:
 *                   type: object
 *                   description: Course details.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The course ID.
 *                       example: 1
 *                     courseCode:
 *                       type: string
 *                       description: The course code.
 *                       example: "CS101"
 *                     courseName:
 *                       type: string
 *                       description: The course name.
 *                       example: "Introduction to Computer Science"
 *                     section:
 *                       type: string
 *                       description: The course section.
 *                       example: "A"
 *                     teacher:
 *                       type: object
 *                       description: Teacher details.
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           description: The teacher's first name.
 *                           example: "John"
 *                         lastName:
 *                           type: string
 *                           description: The teacher's last name.
 *                           example: "Doe"
 *                     classSchedules:
 *                       type: array
 *                       description: The schedule for the course.
 *                       items:
 *                         type: object
 *                         properties:
 *                           day:
 *                             type: string
 *                             description: The day of the class.
 *                             example: "Monday"
 *                           startTime:
 *                             type: string
 *                             description: The start time of the class.
 *                             example: "09:00 AM"
 *                           endTime:
 *                             type: string
 *                             description: The end time of the class.
 *                             example: "12:00 PM"
 *                           room:
 *                             type: string
 *                             description: The room where the class is held.
 *                             example: "Room 101"
 *                     enrollments:
 *                       type: array
 *                       description: List of approved student enrollments for the course.
 *                       items:
 *                         type: object
 *                         properties:
 *                           student:
 *                             type: object
 *                             properties:
 *                               studentId:
 *                                 type: string
 *                                 description: The student's ID.
 *                                 example: "S12345678"
 *                               email:
 *                                 type: string
 *                                 description: The student's email.
 *                                 example: "student@example.com"
 *                               firstName:
 *                                 type: string
 *                                 description: The student's first name.
 *                                 example: "Jane"
 *                               lastName:
 *                                 type: string
 *                                 description: The student's last name.
 *                                 example: "Smith"
 *                               phone:
 *                                 type: string
 *                                 description: The student's phone number.
 *                                 example: "+9876543210"
 *                               grades:
 *                                 type: array
 *                                 description: The student's grades for the course.
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: integer
 *                                       description: The grade record ID.
 *                                       example: 1
 *                                     totalPoint:
 *                                       type: number
 *                                       description: The total points for the course.
 *                                       example: 85
 *                                     letterGrade:
 *                                       type: string
 *                                       description: The letter grade for the course.
 *                                       example: "A"
 *                                     semester:
 *                                       type: string
 *                                       description: The semester in which the grade was earned.
 *                                       example: "Fall 2024"
 *                                     components:
 *                                       type: array
 *                                       description: The grading components for the course.
 *                                       items:
 *                                         type: object
 *                                         properties:
 *                                           id:
 *                                             type: integer
 *                                             description: The component ID.
 *                                             example: 1
 *                                           type:
 *                                             type: string
 *                                             description: The component type.
 *                                             example: "Midterm"
 *                                           point:
 *                                             type: number
 *                                             description: The points for the component.
 *                                             example: 40
 *       400:
 *         description: Bad Request - Invalid token, insufficient permissions, or missing courseId.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: Not Found - Course or enrollments not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Course not found or no students enrolled"
 *       500:
 *         description: Internal Server Error - An error occurred while retrieving the course and student data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getStudentInCourseById"
 */

/**
 * @swagger
 * /teacher/change-password:
 *   patch:
 *     summary: Change teacher's password
 *     description: Allows a teacher to change their password by providing the current password, new password, and confirming the new password.
 *     tags: [Teacher]
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
 *                 description: The teacher's current password.
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 description: The new password that the teacher wants to set.
 *                 example: "newPassword456"
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the new password.
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *       400:
 *         description: Bad request - Invalid password or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Current password is incorrect"
 *       404:
 *         description: Not found - Teacher account not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account not found"
 *       500:
 *         description: Internal server error - Something went wrong with password change
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from teacher change password"
 */

/**
 * @swagger
 * /teacher/update-enroll-status/{enrollmentId}:
 *   patch:
 *     summary: Update the enrollment status
 *     description: Allows a teacher to update the status of a student's enrollment in a course. If the enrollment is approved, an announcement will be sent if not already done.
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: enrollmentId
 *         in: path
 *         required: true
 *         description: The ID of the enrollment to update.
 *         schema:
 *           type: string
 *           example: "12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the enrollment (e.g., 'APPROVED', 'PENDING', etc.).
 *                 example: "APPROVED"
 *               courseId:
 *                 type: string
 *                 description: The ID of the course.
 *                 example: "101"
 *               courseName:
 *                 type: string
 *                 description: The name of the course.
 *                 example: "Introduction to Programming"
 *     responses:
 *       200:
 *         description: Enrollment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the updated enrollment.
 *                   example: 12345
 *                 status:
 *                   type: string
 *                   description: The updated status of the enrollment.
 *                   example: "APPROVED"
 *       400:
 *         description: Bad request - Missing required fields or invalid status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Enrollment ID is required"
 *       500:
 *         description: Internal server error - Error updating the enrollment status or sending the announcement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to send announcement"
 */
