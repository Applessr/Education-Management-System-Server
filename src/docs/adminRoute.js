/**
 * @swagger
 * /admin/register-employee:
 *   post:
 *     summary: Register a new employee (admin only)
 *     description: Allows an admin to register a new employee with their personal details.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the new employee.
 *                 example: "employee@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the new employee's account.
 *                 example: "password123"
 *               firstName:
 *                 type: string
 *                 description: The first name of the new employee.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The last name of the new employee.
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 description: The phone number of the new employee.
 *                 example: "+1234567890"
 *               majorId:
 *                 type: integer
 *                 description: The ID of the major assigned to the employee.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Successfully registered a new employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: The email of the newly registered employee.
 *                   example: "employee@example.com"
 *                 firstName:
 *                   type: string
 *                   description: The first name of the newly registered employee.
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   description: The last name of the newly registered employee.
 *                   example: "Doe"
 *                 phone:
 *                   type: string
 *                   description: The phone number of the newly registered employee.
 *                   example: "+1234567890"
 *       400:
 *         description: Bad request - Missing fields or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All field is require"
 *       403:
 *         description: Forbidden - The user is not an admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       409:
 *         description: Conflict - Email or phone number is already in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "This email is already in use"
 *       500:
 *         description: Internal server error - Error registering the employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from registerEmployee"
 */

/**
 * @swagger
 * /admin/register-student:
 *   post:
 *     summary: Register a new student (admin only)
 *     description: Allows an admin to register a new student with their personal details.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: The student ID (unique).
 *                 example: "S12345"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the new student.
 *                 example: "student@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the new student's account.
 *                 example: "password123"
 *               firstName:
 *                 type: string
 *                 description: The first name of the new student.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The last name of the new student.
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 description: The phone number of the new student.
 *                 example: "+1234567890"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the new student.
 *                 example: "2000-01-01"
 *               gender:
 *                 type: string
 *                 description: The gender of the new student.
 *                 example: "Male"
 *               address:
 *                 type: string
 *                 description: The address of the new student.
 *                 example: "1234 Main St, Anytown"
 *               admitDate:
 *                 type: string
 *                 format: date
 *                 description: The date of admission of the new student.
 *                 example: "2023-08-01"
 *               majorId:
 *                 type: integer
 *                 description: The ID of the major assigned to the student.
 *                 example: 1
 *               adviserId:
 *                 type: integer
 *                 description: The ID of the student's adviser.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Successfully registered a new student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studentId:
 *                   type: string
 *                   description: The student ID of the newly registered student.
 *                   example: "S12345"
 *                 email:
 *                   type: string
 *                   description: The email of the newly registered student.
 *                   example: "student@example.com"
 *                 firstName:
 *                   type: string
 *                   description: The first name of the newly registered student.
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   description: The last name of the newly registered student.
 *                   example: "Doe"
 *                 phone:
 *                   type: string
 *                   description: The phone number of the newly registered student.
 *                   example: "+1234567890"
 *       400:
 *         description: Bad request - Missing fields or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please fill all require field"
 *       403:
 *         description: Forbidden - The user is not an admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       409:
 *         description: Conflict - Student ID, email, or phone number is already in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "This studentId is already exist"
 *       500:
 *         description: Internal server error - Error registering the student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from registerStudent"
 */


/**
 * @swagger
 * /admin/over-all:
 *   get:
 *     summary: Get overall statistics for admin
 *     description: Fetches various statistics such as the number of teachers, faculties, students, and courses for admins.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved overall statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teacher:
 *                   type: integer
 *                   description: The total number of teachers.
 *                   example: 50
 *                 faculty:
 *                   type: integer
 *                   description: The total number of faculties.
 *                   example: 5
 *                 major:
 *                   type: integer
 *                   description: The total number of majors.
 *                   example: 10
 *                 subject:
 *                   type: integer
 *                   description: The total number of unique courses.
 *                   example: 30
 *                 student:
 *                   type: integer
 *                   description: The total number of active students.
 *                   example: 1000
 *                 maleStudent:
 *                   type: integer
 *                   description: The total number of male students.
 *                   example: 500
 *                 femaleStudent:
 *                   type: integer
 *                   description: The total number of female students.
 *                   example: 500
 *                 facultyTeacherCount:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       facultyId:
 *                         type: integer
 *                         description: The ID of the faculty.
 *                         example: 1
 *                       facultyName:
 *                         type: string
 *                         description: The name of the faculty.
 *                         example: "Engineering"
 *                       teacherCount:
 *                         type: integer
 *                         description: The total number of teachers in the faculty.
 *                         example: 10
 *                 facultyStudentCount:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       facultyId:
 *                         type: integer
 *                         description: The ID of the faculty.
 *                         example: 1
 *                       facultyName:
 *                         type: string
 *                         description: The name of the faculty.
 *                         example: "Engineering"
 *                       studentCount:
 *                         type: integer
 *                         description: The total number of active students in the faculty.
 *                         example: 200
 *       400:
 *         description: Bad request - Invalid or missing token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: No data found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No information found"
 *       500:
 *         description: Internal server error - Error fetching the data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getSelfProfile"
 */


/**
 * @swagger
 * /admin/course-syllabus/{majorId}:
 *   get:
 *     summary: Get course syllabus for a major
 *     description: Retrieves the course syllabus, including course recommendations for a specific major, and filters by year if provided.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: majorId
 *         required: true
 *         description: The ID of the major to retrieve the course syllabus for.
 *         schema:
 *           type: string
 *           example: "1"
 *       - in: query
 *         name: year
 *         required: false
 *         description: The year of the course recommendations to filter by (optional).
 *         schema:
 *           type: string
 *           example: "2024"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the course syllabus for the major.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 major:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the major.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The name of the major.
 *                       example: "Computer Science"
 *                     courseRecommendation:
 *                       type: object
 *                       additionalProperties:
 *                         type: object
 *                         properties:
 *                           PREREQUISITES:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 courseCode:
 *                                   type: string
 *                                   description: The course code.
 *                                   example: "CS101"
 *                                 courseName:
 *                                   type: string
 *                                   description: The name of the course.
 *                                   example: "Introduction to Computer Science"
 *                                 credits:
 *                                   type: integer
 *                                   description: The number of credits for the course.
 *                                   example: 3
 *                                 prerequisites:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                     description: The prerequisite course code.
 *                                     example: "CS100"
 *                           OPTIONAL:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 courseCode:
 *                                   type: string
 *                                   description: The course code.
 *                                   example: "CS102"
 *                                 courseName:
 *                                   type: string
 *                                   description: The name of the course.
 *                                   example: "Data Structures"
 *                                 credits:
 *                                   type: integer
 *                                   description: The number of credits for the course.
 *                                   example: 3
 *                                 prerequisites:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                     description: The prerequisite course code.
 *                                     example: "CS101"
 *                           SELECTION:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 courseCode:
 *                                   type: string
 *                                   description: The course code.
 *                                   example: "CS201"
 *                                 courseName:
 *                                   type: string
 *                                   description: The name of the course.
 *                                   example: "Algorithms"
 *                                 credits:
 *                                   type: integer
 *                                   description: The number of credits for the course.
 *                                   example: 3
 *                                 prerequisites:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *                                     description: The prerequisite course code.
 *                                     example: "CS102"
 *                     faculty:
 *                       type: string
 *                       description: The name of the faculty associated with the major.
 *                       example: "Engineering"
 *       400:
 *         description: Bad request - Invalid or missing `majorId` or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "majorId is require"
 *       404:
 *         description: No course syllabus information found for the specified major or year.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No information found"
 *       500:
 *         description: Internal server error - Error retrieving the course syllabus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from courseSyllabus"
 */

/**
 * @swagger
 * /admin/student:
 *   get:
 *     summary: Get all students
 *     description: Retrieves a list of all students, including their major and faculty information.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of all students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the student.
 *                     example: 1
 *                   firstName:
 *                     type: string
 *                     description: The first name of the student.
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     description: The last name of the student.
 *                     example: "Doe"
 *                   gender:
 *                     type: string
 *                     description: The gender of the student.
 *                     example: "MALE"
 *                   status:
 *                     type: string
 *                     description: The status of the student (e.g., "ACTIVE").
 *                     example: "ACTIVE"
 *                   major:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the student's major.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The name of the student's major.
 *                         example: "Computer Science"
 *                       faculty:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: The name of the faculty to which the major belongs.
 *                             example: "Engineering"
 *       400:
 *         description: Bad request - Invalid or expired token or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       500:
 *         description: Internal server error - Error retrieving the list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getAllStudent"
 */

/**
 * @swagger
 * /admin/student/{studentId}:
 *   get:
 *     summary: Get student profile by student ID
 *     description: Retrieves the profile of a student by their student ID, including adviser and major information.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: The ID of the student.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the student's profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The student's ID.
 *                   example: 1
 *                 firstName:
 *                   type: string
 *                   description: The student's first name.
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   description: The student's last name.
 *                   example: "Doe"
 *                 gender:
 *                   type: string
 *                   description: The student's gender.
 *                   example: "MALE"
 *                 major:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The major's ID.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The name of the student's major.
 *                       example: "Computer Science"
 *                     faculty:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: The name of the faculty the major belongs to.
 *                           example: "Engineering"
 *                 adviser:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: The adviser's first name.
 *                       example: "Jane"
 *                     lastName:
 *                       type: string
 *                       description: The adviser's last name.
 *                       example: "Smith"
 *                     email:
 *                       type: string
 *                       description: The adviser's email address.
 *                       example: "janesmith@example.com"
 *                     phone:
 *                       type: string
 *                       description: The adviser's phone number.
 *                       example: "123-456-7890"
 *       400:
 *         description: Bad request - Invalid or expired token, insufficient permissions, or missing student ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student ID is required"
 *       404:
 *         description: Student not found for the given student ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student not found"
 *       500:
 *         description: Internal server error - Error retrieving student profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getStudentById"
 */

/**
 * @swagger
 * /admin/student-status/{studentId}:
 *   patch:
 *     summary: Change student status
 *     description: Allows an admin to update the status of a student (e.g., ACTIVE, INACTIVE).
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: The ID of the student whose status is to be updated.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the student.
 *                 example: "ACTIVE"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated the student's status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student status changed to ACTIVE"
 *       400:
 *         description: Bad request - Invalid token, missing student ID, missing status, or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields are required"
 *       404:
 *         description: Student not found for the given student ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student not found"
 *       500:
 *         description: Internal server error - Error updating the student's status.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from changeStudentStatus"
 */


/**
 * @swagger
 * /admin/student-change-info/{studentId}:
 *   patch:
 *     summary: Change student information
 *     description: Allows an admin to update specific student details such as first name, last name, phone, or address.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: The ID of the student whose information is to be updated.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The student's first name.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The student's last name.
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 description: The student's phone number.
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 description: The student's address.
 *                 example: "123 Main St, Springfield, IL"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated the student's information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 address:
 *                   type: string
 *                   example: "123 Main St, Springfield, IL"
 *       400:
 *         description: Bad request - Invalid token, missing student ID, missing required fields, or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields are required"
 *       404:
 *         description: Student not found for the given student ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student not found"
 *       500:
 *         description: Internal server error - Error updating the student's information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from changeStudentInfo"
 */

/**
 * @swagger
 * /admin/teacher:
 *   get:
 *     summary: Get all employees (teachers)
 *     description: Retrieves a list of all employees (teachers) along with their associated major and faculty information.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of all employees (teachers).
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
 *                   firstName:
 *                     type: string
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                   major:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       name:
 *                         type: string
 *                         example: "Computer Science"
 *                       faculty:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Engineering"
 *       400:
 *         description: Bad request - Invalid token or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       500:
 *         description: Internal server error - Error retrieving the employee data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getAllEmployee"
 */

/**
 * @swagger
 * /admin/teacher/{teacherId}:
 *   get:
 *     summary: Get a specific teacher by ID
 *     description: Retrieves detailed information about a specific teacher based on their ID.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         description: The ID of the teacher to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the teacher's information.
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
 *                   example: "+1234567890"
 *                 major:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     name:
 *                       type: string
 *                       example: "Computer Science"
 *                     faculty:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Engineering"
 *       400:
 *         description: Bad request - Invalid token or insufficient permissions, or missing teacher ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: Teacher not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Teacher not found"
 *       500:
 *         description: Internal server error - Error retrieving the teacher data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getEmployeeById"
 */

/**
 * @swagger
 * /admin/employee-change-info/{employeeId}:
 *   patch:
 *     summary: Update an employee's information
 *     description: Allows an admin to update an employee's first name, last name, or phone number.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: The ID of the employee to update.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Jane"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully updated the employee's information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: "Jane"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *       400:
 *         description: Bad request - Invalid token, insufficient permissions, or missing employee ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: Employee not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Employee not found"
 *       500:
 *         description: Internal server error - Error updating employee information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from changeEmployeeInfo"
 */


/**
 * @swagger
 * /admin/employee-active/{employeeId}:
 *   patch:
 *     summary: Activate an employee's account
 *     description: Allows an admin to activate an employee's account by changing their active status to `true`.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: The ID of the employee to activate.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully activated the employee's account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee active account successful"
 *       400:
 *         description: Bad request - Invalid token, insufficient permissions, or account already active.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: Employee not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Employee not found"
 *       500:
 *         description: Internal server error - Error activating employee account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from activeEmployee"
 */

/**
 * @swagger
 * /admin/employee-inactive/{employeeId}:
 *   patch:
 *     summary: Deactivate an employee's account
 *     description: Allows an admin to deactivate an employee's account by changing their active status to `false`.
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         description: The ID of the employee to deactivate.
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully deactivated the employee's account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Employee Inactive account successful"
 *       400:
 *         description: Bad request - Invalid token, insufficient permissions, or account already inactive.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: Employee not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Employee not found"
 *       500:
 *         description: Internal server error - Error deactivating employee account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from inactiveEmployee"
 */









