/**
 * @swagger
 * /course/single-course/{courseId}:
 *   get:
 *     summary: Get details of a specific course
 *     description: Retrieves detailed information about a specific course by its ID, including the course's teacher, major, and class schedules.
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to retrieve.
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Successfully retrieved the course details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 101
 *                 courseCode:
 *                   type: string
 *                   example: "CS101"
 *                 courseName:
 *                   type: string
 *                   example: "Introduction to Computer Science"
 *                 credits:
 *                   type: integer
 *                   example: 3
 *                 section:
 *                   type: string
 *                   example: "A"
 *                 status:
 *                   type: string
 *                   example: "Active"
 *                 teacher:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phone:
 *                       type: string
 *                       example: "+123456789"
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
 *                 classSchedules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: "Monday"
 *                       startTime:
 *                         type: string
 *                         example: "08:00"
 *                       endTime:
 *                         type: string
 *                         example: "10:00"
 *                       room:
 *                         type: string
 *                         example: "Room 101"
 *       404:
 *         description: Course not found with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "this course does not exist"
 *       500:
 *         description: Internal server error when retrieving course details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getCourseById"
 */


/**
 * @swagger
 * /course/all-course:
 *   get:
 *     summary: Get a list of all courses
 *     description: Retrieves a list of courses with optional search and semester filters.
 *     tags: [Course]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         required: false
 *         description: Term to search for in course name or course code. It can be either a string or number.
 *         schema:
 *           type: string
 *           example: "CS101"
 *       - in: body
 *         name: semester
 *         required: false
 *         description: The semester to filter the courses by.
 *         schema:
 *           type: string
 *           example: "1/2024"
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 101
 *                   courseCode:
 *                     type: string
 *                     example: "CS101"
 *                   courseName:
 *                     type: string
 *                     example: "Introduction to Computer Science"
 *                   credits:
 *                     type: integer
 *                     example: 3
 *                   section:
 *                     type: string
 *                     example: "A"
 *                   status:
 *                     type: string
 *                     example: "Active"
 *                   seat:
 *                     type: integer
 *                     example: 30
 *                   teacher:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       phone:
 *                         type: string
 *                         example: "+123456789"
 *                   major:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Computer Science"
 *                       faculty:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Faculty of Engineering"
 *                   classSchedules:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         day:
 *                           type: string
 *                           example: "Monday"
 *                         startTime:
 *                           type: string
 *                           example: "08:00"
 *                         endTime:
 *                           type: string
 *                           example: "10:00"
 *                         room:
 *                           type: string
 *                           example: "Room 101"
 *                   examSchedule:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         examType:
 *                           type: string
 *                           example: "Midterm"
 *                         examDate:
 *                           type: string
 *                           example: "2024-11-15"
 *                         startTime:
 *                           type: string
 *                           example: "12:00"
 *                         endTime:
 *                           type: string
 *                           example: "14:00"
 *                         room:
 *                           type: string
 *                           example: "Room 102"
 *                   _count:
 *                     type: object
 *                     properties:
 *                       enrollments:
 *                         type: integer
 *                         example: 25
 *                   enrollments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         status:
 *                           type: string
 *                           example: "APPROVED"
 *       500:
 *         description: Internal server error when retrieving courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getAllCourse"
 */

/**
 * @swagger
 * /course/all-major:
 *   get:
 *     summary: Get a list of all majors
 *     description: Retrieves a list of all available majors in the system.
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of majors.
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
 *                   name:
 *                     type: string
 *                     example: "Computer Science"
 *                   faculty:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Faculty of Engineering"
 *       500:
 *         description: Internal server error when retrieving majors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getAllMajor"
 */


/**
 * @swagger
 * /course/major/{facultyId}:
 *   get:
 *     summary: Get a list of majors by faculty
 *     description: Retrieves a list of majors for a specific faculty using the faculty ID.
 *     tags: [Course]
 *     parameters:
 *       - name: facultyId
 *         in: path
 *         description: The ID of the faculty to fetch majors for.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved a list of majors for the given faculty.
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
 *                   name:
 *                     type: string
 *                     example: "Computer Science"
 *       400:
 *         description: Invalid faculty ID provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid facultyId"
 *       404:
 *         description: Faculty not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Faculty not found"
 *       500:
 *         description: Internal server error when retrieving majors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getMajorByFaculty"
 */

/**
 * @swagger
 * /course/all-faculty:
 *   get:
 *     summary: Get a list of all faculties
 *     description: Retrieves all faculties available in the system.
 *     tags:
 *       - Course
 *     responses:
 *       200:
 *         description: A list of all faculties retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the faculty.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the faculty.
 *                     example: "Faculty of Science"
 *       500:
 *         description: Internal server error when fetching faculties.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from getAllFaculty"
 */

/**
 * @swagger
 * /course/teacher:
 *   get:
 *     summary: Get courses assigned to the teacher
 *     description: Retrieves a list of courses that are assigned to the teacher based on the teacher's ID.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of courses assigned to the teacher.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The unique identifier for the course.
 *                       example: 101
 *                     courseCode:
 *                       type: string
 *                       description: The code of the course.
 *                       example: "CS101"
 *                     courseName:
 *                       type: string
 *                       description: The name of the course.
 *                       example: "Introduction to Computer Science"
 *                     credits:
 *                       type: integer
 *                       description: The number of credits for the course.
 *                       example: 3
 *                     section:
 *                       type: string
 *                       description: The section for the course.
 *                       example: "A"
 *                     classSchedules:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           day:
 *                             type: string
 *                             description: The day the class is scheduled.
 *                             example: "Monday"
 *                           startTime:
 *                             type: string
 *                             description: The start time of the class.
 *                             example: "08:00"
 *                           endTime:
 *                             type: string
 *                             description: The end time of the class.
 *                             example: "10:00"
 *                           room:
 *                             type: string
 *                             description: The room where the class is held.
 *                             example: "Room 202"
 *                     examSchedule:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           examDate:
 *                             type: string
 *                             description: The date of the exam.
 *                             example: "2024-06-10"
 *                           startTime:
 *                             type: string
 *                             description: The start time of the exam.
 *                             example: "10:00"
 *                           endTime:
 *                             type: string
 *                             description: The end time of the exam.
 *                             example: "12:00"
 *                           room:
 *                             type: string
 *                             description: The room where the exam is held.
 *                             example: "Exam Hall 1"
 *                           examType:
 *                             type: string
 *                             description: The type of exam.
 *                             example: "Final"
 *       400:
 *         description: Teacher ID is required or the user does not have permission.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "teacherId is require" or "You do not have permission"
 *       401:
 *         description: Unauthorized if authentication fails or token is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from teacherGetCourse"
 */

/**
 * @swagger
 * /course/employee/create-course:
 *   post:
 *     summary: Create a new course
 *     description: Allows admins and teachers to create a new course with all relevant details.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseCode:
 *                 type: string
 *                 description: The unique code for the course.
 *                 example: "CS101"
 *               courseName:
 *                 type: string
 *                 description: The name of the course.
 *                 example: "Introduction to Computer Science"
 *               credits:
 *                 type: integer
 *                 description: The number of credits the course is worth.
 *                 example: 3
 *               seat:
 *                 type: integer
 *                 description: The number of available seats for the course.
 *                 example: 30
 *               section:
 *                 type: string
 *                 description: The section for the course.
 *                 example: "A"
 *               teacherId:
 *                 type: integer
 *                 description: The ID of the teacher assigned to the course.
 *                 example: 101
 *               courseSyllabusId:
 *                 type: integer
 *                 description: The ID of the course syllabus.
 *                 example: 1
 *               majorId:
 *                 type: integer
 *                 description: The ID of the major associated with the course.
 *                 example: 2
 *               classSchedules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       description: The day of the class.
 *                       example: "Monday"
 *                     startTime:
 *                       type: string
 *                       description: The start time of the class.
 *                       example: "08:00"
 *                     endTime:
 *                       type: string
 *                       description: The end time of the class.
 *                       example: "10:00"
 *                     room:
 *                       type: string
 *                       description: The room where the class is held.
 *                       example: "Room 202"
 *               examSchedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     examDate:
 *                       type: string
 *                       description: The date of the exam.
 *                       example: "2024-06-10"
 *                     startTime:
 *                       type: string
 *                       description: The start time of the exam.
 *                       example: "10:00"
 *                     endTime:
 *                       type: string
 *                       description: The end time of the exam.
 *                       example: "12:00"
 *                     room:
 *                       type: string
 *                       description: The room where the exam is held.
 *                       example: "Exam Hall 1"
 *                     examType:
 *                       type: string
 *                       description: The type of the exam.
 *                       example: "Final"
 *     responses:
 *       201:
 *         description: Course successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created course.
 *                   example: 123
 *                 courseCode:
 *                   type: string
 *                   description: The code of the course.
 *                   example: "CS101"
 *                 courseName:
 *                   type: string
 *                   description: The name of the course.
 *                   example: "Introduction to Computer Science"
 *                 credits:
 *                   type: integer
 *                   description: The number of credits.
 *                   example: 3
 *                 seat:
 *                   type: integer
 *                   description: Number of seats available.
 *                   example: 30
 *                 section:
 *                   type: string
 *                   description: The section of the course.
 *                   example: "A"
 *                 teacherId:
 *                   type: integer
 *                   description: The ID of the teacher assigned to the course.
 *                   example: 101
 *                 courseSyllabusId:
 *                   type: integer
 *                   description: The ID of the course syllabus.
 *                   example: 1
 *                 majorId:
 *                   type: integer
 *                   description: The ID of the major associated with the course.
 *                   example: 2
 *       400:
 *         description: Error if required fields are missing or invalid course code.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All important fields is require"
 *       401:
 *         description: Unauthorized access if the user does not have proper permission.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from createCourse"
 */

/**
 * @swagger
 * /course/employee/edit-course/{courseId}:
 *   patch:
 *     summary: Edit an existing course
 *     description: Allows admins and teachers to edit the details of an existing course.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to be edited.
 *         schema:
 *           type: integer
 *           example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseCode:
 *                 type: string
 *                 description: The new unique code for the course.
 *                 example: "CS102"
 *               courseName:
 *                 type: string
 *                 description: The new name of the course.
 *                 example: "Advanced Computer Science"
 *               credits:
 *                 type: integer
 *                 description: The new number of credits the course is worth.
 *                 example: 4
 *               seat:
 *                 type: integer
 *                 description: The new number of available seats for the course.
 *                 example: 35
 *               section:
 *                 type: string
 *                 description: The new section for the course.
 *                 example: "B"
 *               teacherId:
 *                 type: integer
 *                 description: The new ID of the teacher assigned to the course.
 *                 example: 102
 *               courseSyllabusId:
 *                 type: integer
 *                 description: The new ID of the course syllabus.
 *                 example: 2
 *               classSchedules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       description: The new day of the class.
 *                       example: "Tuesday"
 *                     startTime:
 *                       type: string
 *                       description: The new start time of the class.
 *                       example: "09:00"
 *                     endTime:
 *                       type: string
 *                       description: The new end time of the class.
 *                       example: "11:00"
 *                     room:
 *                       type: string
 *                       description: The new room where the class is held.
 *                       example: "Room 205"
 *               examSchedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     examDate:
 *                       type: string
 *                       description: The new date of the exam.
 *                       example: "2024-07-15"
 *                     startTime:
 *                       type: string
 *                       description: The new start time of the exam.
 *                       example: "14:00"
 *                     endTime:
 *                       type: string
 *                       description: The new end time of the exam.
 *                       example: "16:00"
 *                     room:
 *                       type: string
 *                       description: The new room where the exam is held.
 *                       example: "Exam Hall 2"
 *                     examType:
 *                       type: string
 *                       description: The new type of the exam.
 *                       example: "Midterm"
 *     responses:
 *       200:
 *         description: Course successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the updated course.
 *                   example: 123
 *                 courseCode:
 *                   type: string
 *                   description: The updated course code.
 *                   example: "CS102"
 *                 courseName:
 *                   type: string
 *                   description: The updated course name.
 *                   example: "Advanced Computer Science"
 *                 credits:
 *                   type: integer
 *                   description: The updated number of credits.
 *                   example: 4
 *                 seat:
 *                   type: integer
 *                   description: The updated number of seats.
 *                   example: 35
 *                 section:
 *                   type: string
 *                   description: The updated section of the course.
 *                   example: "B"
 *                 teacherId:
 *                   type: integer
 *                   description: The updated teacher ID.
 *                   example: 102
 *                 courseSyllabusId:
 *                   type: integer
 *                   description: The updated course syllabus ID.
 *                   example: 2
 *                 classSchedules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         description: The updated day of the class.
 *                         example: "Tuesday"
 *                       startTime:
 *                         type: string
 *                         description: The updated start time of the class.
 *                         example: "09:00"
 *                       endTime:
 *                         type: string
 *                         description: The updated end time of the class.
 *                         example: "11:00"
 *                       room:
 *                         type: string
 *                         description: The updated room of the class.
 *                         example: "Room 205"
 *                 examSchedule:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       examDate:
 *                         type: string
 *                         description: The updated exam date.
 *                         example: "2024-07-15"
 *                       startTime:
 *                         type: string
 *                         description: The updated exam start time.
 *                         example: "14:00"
 *                       endTime:
 *                         type: string
 *                         description: The updated exam end time.
 *                         example: "16:00"
 *                       room:
 *                         type: string
 *                         description: The updated exam room.
 *                         example: "Exam Hall 2"
 *                       examType:
 *                         type: string
 *                         description: The updated exam type.
 *                         example: "Midterm"
 *       400:
 *         description: Error if no field is provided to update, or if course does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "At least one field is required to change"
 *       401:
 *         description: Unauthorized if the user does not have permission to edit the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from editCourse"
 */

/**
 * @swagger
 * /course/employee/inactive-course/{courseId}:
 *   patch:
 *     summary: Set a course as inactive
 *     description: Allows admins and teachers to set a course as inactive.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to be marked as inactive.
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: The course was successfully marked as inactive.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course Inactive successful"
 *       400:
 *         description: Error if the course does not exist, or is already inactive, or the user lacks permission.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "This course is not exist"
 *       401:
 *         description: Unauthorized error if the user does not have permission to deactivate the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from inactiveCourse"
 */

/**
 * @swagger
 * /course/employee/active-course/{courseId}:
 *   patch:
 *     summary: Set a course as active
 *     description: Allows admins and teachers to set a course as active.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to be marked as active.
 *         schema:
 *           type: integer
 *           example: 123
 *     responses:
 *       200:
 *         description: The course was successfully marked as active.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course active successful"
 *       400:
 *         description: Error if the course does not exist, or is already active, or the user lacks permission.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "This course is not exist"
 *       401:
 *         description: Unauthorized error if the user does not have permission to activate the course.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from activeCourse"
 */

/**
 * @swagger
 * /course/employee/assign-syllabus:
 *   post:
 *     summary: Assign a course to a syllabus
 *     description: Allows admins and teachers to assign a course to a syllabus based on the major, year, and recommendation type.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: integer
 *                 description: The ID of the course to be assigned to the syllabus.
 *                 example: 101
 *               majorId:
 *                 type: integer
 *                 description: The ID of the major.
 *                 example: 1
 *               year:
 *                 type: integer
 *                 description: The academic year for the syllabus.
 *                 example: 2024
 *               recommendationType:
 *                 type: string
 *                 description: The recommendation type for the course syllabus (e.g., mandatory, elective).
 *                 example: "mandatory"
 *     responses:
 *       200:
 *         description: The course was successfully assigned to the syllabus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course successfully assigned to syllabus"
 *                 course:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 101
 *                     courseName:
 *                       type: string
 *                       example: "Introduction to Computer Science"
 *                     courseSyllabusId:
 *                       type: integer
 *                       example: 1
 *                 syllabus:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     majorId:
 *                       type: integer
 *                       example: 1
 *                     year:
 *                       type: integer
 *                       example: 2024
 *                     recommendationType:
 *                       type: string
 *                       example: "mandatory"
 *       400:
 *         description: Error if any of the required fields are missing or if the user lacks permission.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "All fields are required"
 *       401:
 *         description: Unauthorized error if the user does not have permission to assign a syllabus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You do not have permission"
 *       500:
 *         description: Internal server error in case of failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from assignToSyllabus"
 */

/**
 * @swagger
 * /course/student/course-syllabus:
 *   get:
 *     summary: Get student's course syllabus
 *     description: Retrieve the course syllabus for a specific student, grouped by year and recommendation type.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the student's course syllabus.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 studentId:
 *                   type: string
 *                   example: "S12345"
 *                 email:
 *                   type: string
 *                   example: "student@example.com"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 major:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Computer Science"
 *                     faculty:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Faculty of Engineering"
 *                     courseRecommendation:
 *                       type: object
 *                       properties:
 *                         2023:
 *                           type: object
 *                           properties:
 *                             PREREQUISITES:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   courseCode:
 *                                     type: string
 *                                     example: "CS101"
 *                                   courseName:
 *                                     type: string
 *                                     example: "Introduction to Computer Science"
 *                                   credits:
 *                                     type: integer
 *                                     example: 3
 *                                   recommendationType:
 *                                     type: string
 *                                     example: "PREREQUISITES"
 *                             OPTIONAL:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   courseCode:
 *                                     type: string
 *                                     example: "CS102"
 *                                   courseName:
 *                                     type: string
 *                                     example: "Data Structures"
 *                                   credits:
 *                                     type: integer
 *                                     example: 3
 *                                   recommendationType:
 *                                     type: string
 *                                     example: "OPTIONAL"
 *                             SELECTION:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   courseCode:
 *                                     type: string
 *                                     example: "CS103"
 *                                   courseName:
 *                                     type: string
 *                                     example: "Algorithms"
 *                                   credits:
 *                                     type: integer
 *                                     example: 3
 *                                   recommendationType:
 *                                     type: string
 *                                     example: "SELECTION"
 *       400:
 *         description: Error if the student is not found or if the token is expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       500:
 *         description: Internal server error in case of failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetCourseSyllabus"
 */


/**
 * @swagger
 * /course/student/enroll-course:
 *   get:
 *     summary: Get student's enrolled courses
 *     description: Retrieve the list of courses a specific student is enrolled in, including the course details, enrollment status, and semester.
 *     tags:
 *       - Course
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the student's enrolled courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 studentId:
 *                   type: string
 *                   example: "S12345"
 *                 email:
 *                   type: string
 *                   example: "student@example.com"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 enrollments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       status:
 *                         type: string
 *                         enum: [PENDING, COMPLETED, FAILED]
 *                         example: "PENDING"
 *                       registrationDate:
 *                         type: string
 *                         format: date
 *                         example: "2024-09-01"
 *                       semester:
 *                         type: string
 *                         example: "1/2024"
 *                       course:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 101
 *                           courseCode:
 *                             type: string
 *                             example: "CS101"
 *                           courseName:
 *                             type: string
 *                             example: "Introduction to Computer Science"
 *                           credits:
 *                             type: integer
 *                             example: 3
 *                           section:
 *                             type: string
 *                             example: "A"
 *       400:
 *         description: Error if the student is not found or if the token is expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Check token expired date"
 *       500:
 *         description: Internal server error in case of failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetEnrollCourse"
 */

/**
 * @swagger
 * /course/student/class-schedule:
 *   get:
 *     summary: Get student's class schedule by semester
 *     description: Retrieve the class schedule for a student based on the selected semester, including course details and instructor information.
 *     tags:
 *       - Course
 *     parameters:
 *       - in: query
 *         name: semester
 *         required: true
 *         description: The semester for which the class schedule is requested.
 *         schema:
 *           type: string
 *           example: "2024-1"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the student's class schedule for the given semester.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 studentId:
 *                   type: string
 *                   example: "S12345"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 semester:
 *                   type: string
 *                   example: "2024-1"
 *                 enrollments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       course:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 101
 *                           courseCode:
 *                             type: string
 *                             example: "CS101"
 *                           courseName:
 *                             type: string
 *                             example: "Introduction to Computer Science"
 *                           credits:
 *                             type: integer
 *                             example: 3
 *                           classSchedules:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 day:
 *                                   type: string
 *                                   example: "Monday"
 *                                 time:
 *                                   type: string
 *                                   example: "10:00 AM - 12:00 PM"
 *                           teacher:
 *                             type: object
 *                             properties:
 *                               firstName:
 *                                 type: string
 *                                 example: "Jane"
 *                               lastName:
 *                                 type: string
 *                                 example: "Smith"
 *       400:
 *         description: Error if the student is not found or the token is expired or semester is not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "semester is required"
 *       500:
 *         description: Internal server error in case of failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetClassScheduleBySemester"
 */


/**
 * @swagger
 * /course/student/enroll-course-semester:
 *   post:
 *     summary: Get student's enrollment details for a specific semester
 *     description: Retrieve the courses a student is enrolled in for a given semester, including course details and enrollment status.
 *     tags:
 *       - Course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               semester:
 *                 type: string
 *                 required: true
 *                 description: The semester for which the student's enrollment details are requested.
 *                 example: "1/2024"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the student's enrollment details for the given semester.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 studentId:
 *                   type: string
 *                   example: "S12345"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 enrollments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       status:
 *                         type: string
 *                         example: "APPROVED"
 *                       registrationDate:
 *                         type: string
 *                         example: "2024-01-15"
 *                       course:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1001
 *                           courseCode:
 *                             type: string
 *                             example: "CS101"
 *                           courseName:
 *                             type: string
 *                             example: "Introduction to Computer Science"
 *                           credits:
 *                             type: integer
 *                             example: 3
 *                           section:
 *                             type: string
 *                             example: "A"
 *       400:
 *         description: Error if the semester is not provided or the token is expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "semester is required"
 *       500:
 *         description: Internal server error in case of failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentGetEnrollCourseBySemester"
 */

/**
 * @swagger
 * /course/student/enroll-course:
 *   post:
 *     summary: Enroll a student in a course for a specific semester
 *     description: This endpoint allows a student to enroll in a course for a specified semester, verifying prerequisites before enrollment.
 *     tags:
 *       - Course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               semester:
 *                 type: string
 *                 required: true
 *                 description: The semester in which the student wants to enroll in the course.
 *                 example: "2024-1"
 *               courseId:
 *                 type: integer
 *                 required: true
 *                 description: The ID of the course the student wants to enroll in.
 *                 example: 101
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully enrolled in the course for the specified semester.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 201
 *                 studentId:
 *                   type: integer
 *                   example: 12345
 *                 semester:
 *                   type: string
 *                   example: "2024-1"
 *                 courseId:
 *                   type: integer
 *                   example: 101
 *       400:
 *         description: Error if the token is expired, semester or courseId are missing, or prerequisites are not met.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "all fields are required"
 *       500:
 *         description: Internal server error in case of failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentCreateEnroll"
 */

/**
 * @swagger
 * /course/student/class-schedule-by-id/{courseCode}:
 *   get:
 *     summary: Get class schedule by course code
 *     description: This endpoint retrieves the class schedule for a specific course identified by its `courseCode`.
 *     tags:
 *       - Course
 *     parameters:
 *       - in: path
 *         name: courseCode
 *         required: true
 *         description: The unique course code to retrieve class schedule for.
 *         schema:
 *           type: string
 *           example: "CS101"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the class schedule.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   courseCode:
 *                     type: string
 *                   courseName:
 *                     type: string
 *                   credits:
 *                     type: integer
 *                   seat:
 *                     type: integer
 *                   section:
 *                     type: string
 *                   status:
 *                     type: string
 *                   teacherId:
 *                     type: integer
 *                   courseSyllabusId:
 *                     type: integer
 *                   majorId:
 *                     type: integer
 *                   teacherFirstName:
 *                     type: string
 *                   teacherLastName:
 *                     type: string
 *                   teacherEmail:
 *                     type: string
 *                   teacherName:
 *                     type: string
 *       400:
 *         description: Error if the `courseCode` is missing or token has expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "courseCode is required"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error from studentCancelEnroll"
 */















