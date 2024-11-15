/**
 * @swagger
 * /grade/student/grade:
 *   get:
 *     summary: Get student's grade
 *     description: Allows students to retrieve their grades for all enrolled courses, grouped by semester.
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved student's grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   semester:
 *                     type: string
 *                     description: The semester in which the grades were received
 *                     example: "Fall 2024"
 *                   courses:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         courseId:
 *                           type: integer
 *                           description: The ID of the course
 *                           example: 101
 *                         courseCode:
 *                           type: string
 *                           description: The code of the course
 *                           example: "CS101"
 *                         courseName:
 *                           type: string
 *                           description: The name of the course
 *                           example: "Introduction to Computer Science"
 *                         section:
 *                           type: string
 *                           description: The section of the course
 *                           example: "A"
 *                         credits:
 *                           type: integer
 *                           description: The number of credits for the course
 *                           example: 3
 *                         letterGrade:
 *                           type: string
 *                           description: The letter grade received in the course
 *                           example: "A"
 *                         totalPoint:
 *                           type: integer
 *                           description: The total points earned in the course
 *                           example: 90
 *       400:
 *         description: Bad request - Student ID not found or token expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       500:
 *         description: Internal server error - Error retrieving grades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetGrade"
 */

/**
 * @swagger
 * /grade/student/all-grade:
 *   get:
 *     summary: Get all grades for a student
 *     description: Allows students to retrieve their grades for all enrolled courses without grouping by semester.
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all grades for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the grade entry
 *                     example: 1
 *                   totalPoint:
 *                     type: integer
 *                     description: The total points earned in the course
 *                     example: 85
 *                   semester:
 *                     type: string
 *                     description: The semester in which the grade was awarded
 *                     example: "Fall 2024"
 *                   letterGrade:
 *                     type: string
 *                     description: The letter grade awarded for the course
 *                     example: "B"
 *                   course:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the course
 *                         example: 101
 *                       courseCode:
 *                         type: string
 *                         description: The course code
 *                         example: "CS101"
 *                       courseName:
 *                         type: string
 *                         description: The course name
 *                         example: "Introduction to Computer Science"
 *                       section:
 *                         type: string
 *                         description: The section of the course
 *                         example: "A"
 *                       credits:
 *                         type: integer
 *                         description: The number of credits for the course
 *                         example: 3
 *       400:
 *         description: Bad request - Student ID not found or token expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       500:
 *         description: Internal server error - Error retrieving all grades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetAllGrade"
 */

/**
 * @swagger
 * /grade/student/grade-semester:
 *   get:
 *     summary: Get grades for a student by semester
 *     description: Allows students to retrieve their grades for a specific semester.
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: semester
 *         description: The semester to filter grades by
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             semester:
 *               type: string
 *               description: The semester for which grades are requested
 *               example: "1/2024"
 *     responses:
 *       200:
 *         description: Successfully retrieved grades for the specified semester
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the grade entry
 *                     example: 1
 *                   totalPoint:
 *                     type: integer
 *                     description: The total points earned in the course
 *                     example: 88
 *                   letterGrade:
 *                     type: string
 *                     description: The letter grade awarded for the course
 *                     example: "A"
 *                   course:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the course
 *                         example: 101
 *                       courseCode:
 *                         type: string
 *                         description: The course code
 *                         example: "CS101"
 *                       courseName:
 *                         type: string
 *                         description: The course name
 *                         example: "Introduction to Computer Science"
 *                       section:
 *                         type: string
 *                         description: The section of the course
 *                         example: "A"
 *       400:
 *         description: Bad request - Semester is required or token expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "semester is required"
 *       500:
 *         description: Internal server error - Error retrieving grades by semester
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetGradeBySemester"
 */


/**
 * @swagger
 * /grade/student/score/{courseId}:
 *   get:
 *     summary: Get a student's score for a specific course
 *     description: Retrieve the most recent grade details for a specific course taken by a student.
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course for which the student's score is requested
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Successfully retrieved the student's score for the specified course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the grade entry
 *                     example: 1
 *                   totalPoint:
 *                     type: integer
 *                     description: The total points earned in the course
 *                     example: 85
 *                   letterGrade:
 *                     type: string
 *                     description: The letter grade awarded for the course
 *                     example: "B"
 *                   credit:
 *                     type: integer
 *                     description: The credit value of the course
 *                     example: 3
 *                   semester:
 *                     type: string
 *                     description: The semester in which the course was taken
 *                     example: "Spring 2024"
 *                   components:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the grade component (e.g., assignments, exams)
 *                         type:
 *                           type: string
 *                           description: The type of grade component (e.g., "midterm", "final")
 *                           example: "midterm"
 *                         point:
 *                           type: integer
 *                           description: The points earned for that component
 *                           example: 40
 *                   course:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the course
 *                         example: 101
 *                       courseCode:
 *                         type: string
 *                         description: The course code
 *                         example: "CS101"
 *                       courseName:
 *                         type: string
 *                         description: The course name
 *                         example: "Introduction to Computer Science"
 *                       section:
 *                         type: string
 *                         description: The section of the course
 *                         example: "A"
 *       400:
 *         description: Bad request - courseId is required or token expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "courseId is required"
 *       404:
 *         description: Not found - No grade found for the specified student and course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No grade found for this student in the course"
 *       500:
 *         description: Internal server error - Error retrieving the score data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetScore"
 */

/**
 * @swagger
 * /grade/student/GPA/all:
 *   get:
 *     summary: Get the student's GPA for all approved semesters
 *     description: Retrieve the average GPA across all semesters the student has enrolled in with an "APPROVED" status.
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the student's average GPA for all approved semesters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 AllTermGPA:
 *                   type: number
 *                   format: float
 *                   description: The average GPA across all semesters
 *                   example: 3.45
 *       400:
 *         description: Bad request - Token expired or missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       500:
 *         description: Internal server error - Error calculating GPA
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetAllGPA"
 */

/**
 * @swagger
 * /grade/student/GPA/semester:
 *   get:
 *     summary: Get the student's GPA by semester
 *     description: Retrieve the GPA for each semester the student has enrolled in with an "APPROVED" status.
 *     tags: [Grade]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the student's GPA by semester
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 GPA:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       semester:
 *                         type: string
 *                         description: The semester (e.g., "2024 Fall")
 *                         example: "1/2024"
 *                       gpa:
 *                         type: number
 *                         format: float
 *                         description: The GPA for that semester
 *                         example: 3.45
 *                       credits:
 *                         type: integer
 *                         description: The total number of credits for that semester
 *                         example: 15
 *       400:
 *         description: Bad request - Token expired or missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       500:
 *         description: Internal server error - Error calculating GPA by semester
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetGPABySemester"
 */


/**
 * @swagger
 * /grade/teacher/score/{courseId}:
 *   post:
 *     summary: Add a score for a student in a specific course
 *     description: Allows a teacher to add a score for a student in a specific course and semester. The score is added as a new grade component.
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The course ID for which the score is being added.
 *         schema:
 *           type: string
 *       - in: body
 *         name: scoreDetails
 *         required: true
 *         description: The details of the score to be added (semester, student ID, score type, and score point).
 *         schema:
 *           type: object
 *           properties:
 *             semester:
 *               type: string
 *               description: The semester in which the score is being recorded.
 *               example: "2024 Spring"
 *             studentId:
 *               type: integer
 *               description: The ID of the student for whom the score is being added.
 *               example: 12345
 *             type:
 *               type: string
 *               description: The type of grade component (e.g., "Midterm", "Final", "Assignment").
 *               example: "Midterm"
 *             point:
 *               type: number
 *               format: float
 *               description: The score point awarded for the grade component.
 *               example: 85.5
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully added the score and updated the total score for the student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Score added successfully"
 *                 updatedTotalScore:
 *                   type: object
 *                   properties:
 *                     component:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the newly created grade component.
 *                           example: 5678
 *                         type:
 *                           type: string
 *                           description: The type of the grade component (e.g., "Midterm").
 *                           example: "Midterm"
 *                         point:
 *                           type: number
 *                           description: The score point for the grade component.
 *                           example: 85.5
 *                         gradeId:
 *                           type: integer
 *                           description: The ID of the grade record to which this component is associated.
 *                           example: 123
 *                     totalScore:
 *                       type: number
 *                       description: The updated total score for the student in the course.
 *                       example: 90.5
 *       400:
 *         description: Bad request - Missing required fields or insufficient permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields are required"
 *       403:
 *         description: Forbidden - The user is not a teacher.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       500:
 *         description: Internal server error - Error adding the score or updating total score.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from teacherAddScore"
 */

/**
 * @swagger
 * /grade/teacher/edit-score/{componentId}:
 *   patch:
 *     summary: Edit a score component for a student
 *     description: Allows a teacher to edit an existing score component (e.g., type or point) for a student in a specific course.
 *     tags: [Grade]
 *     parameters:
 *       - in: path
 *         name: componentId
 *         required: true
 *         description: The ID of the grade component to be edited.
 *         schema:
 *           type: string
 *       - in: body
 *         name: scoreDetails
 *         required: true
 *         description: The fields to be updated for the grade component (type and/or point).
 *         schema:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               description: The new type of grade component (e.g., "Midterm", "Final").
 *               example: "Final"
 *             point:
 *               type: number
 *               format: float
 *               description: The new score point for the grade component.
 *               example: 90.0
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully edited the score component and updated the total score for the student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Score edit successfully"
 *                 updatedTotalScore:
 *                   type: number
 *                   description: The updated total score for the student in the course after the edit.
 *                   example: 95.5
 *       400:
 *         description: Bad request - Missing required fields or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "At least one field is require change"
 *       403:
 *         description: Forbidden - The user is not a teacher.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       404:
 *         description: Not found - The specified grade component does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Grade component not found"
 *       500:
 *         description: Internal server error - Error editing the score or updating the total score.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from teacherEditScore"
 */

