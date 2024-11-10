const prisma = require("../configs/prisma");
const createError = require("../utils/create-error");

const courseModels = {};
courseModels.getAllCourse = async (searchTerm, semester) => {
  const isNumericSearchTerm = !isNaN(parseInt(searchTerm));
  const query = searchTerm
    ? {
        where: {
          OR: [
            {
              courseName: {
                contains: searchTerm,
              },
            },
            ...(isNumericSearchTerm
              ? [
                  {
                    courseCode: {
                      equals: parseInt(searchTerm),
                    },
                  },
                ]
              : []),
          ],
        },
      }
    : {};

  return await prisma.course.findMany({
    ...query,
    select: {
      id: true,
      courseCode: true,
      courseName: true,
      credits: true,
      section: true,
      status: true,
      seat: true,
      teacher: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
      major: {
        select: {
          name: true,
          faculty: {
            select: {
              name: true,
            },
          },
        },
      },
      classSchedules: {
        select: {
          day: true,
          startTime: true,
          endTime: true,
          room: true,
        },
      },
      _count: {
        select: {
          enrollments: {
            where: {
              status: {
                not: "CANCELLED",
              },
              ...(semester ? { semester: semester } : {}),
            },
          },
        },
      },

      enrollments: {
        where: {
          status: "APPROVED",
          ...(semester ? { semester: semester } : {}),
        },
        select: {
          id: true,
          status: true,
        },
      },
    },
  });
};
courseModels.getCourseById = async (courseId) => {
  return await prisma.course.findMany({
    where: {
      id: Number(courseId),
    },
    select: {
      id: true,
      courseCode: true,
      courseName: true,
      credits: true,
      section: true,
      status: true,
      teacher: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
      major: {
        select: {
          name: true,
          faculty: {
            select: {
              name: true,
            },
          },
        },
      },
      classSchedules: {
        select: {
          day: true,
          startTime: true,
          endTime: true,
          room: true,
        },
      },
    },
  });
};
courseModels.getAllMajor = async () => {
  return await prisma.major.findMany({});
};
courseModels.getMajorByFaculty = async (facultyId) => {
  return await prisma.major.findMany({
    where: {
      facultyId: Number(facultyId),
    },
  });
};
courseModels.getAllFaculty = async () => {
  return await prisma.faculty.findMany({});
};
courseModels.teacherGetCourse = async (teacherId) => {
  const courses = await prisma.course.findMany({
    where: {
      teacherId: Number(teacherId),
    },
    include: {
      classSchedules: {
        select: {
          day: true,
          startTime: true,
          endTime: true,
          room: true,
        },
      },
      examSchedule: {
        select: {
          examDate: true,
          startTime: true,
          endTime: true,
          room: true,
          examType: true,
        },
      },
      enrollments: {
        where: {
          status: "APPROVED",
        },
        select: {
          id: true,
        },
      },
    },
  });

  const groupByCourseCode = (courses) => {
    return courses.reduce((acc, course) => {
      const { courseCode } = course;
      if (!acc[courseCode]) {
        acc[courseCode] = [];
      }
      acc[courseCode].push(course);
      return acc;
    }, {});
  };

  return groupByCourseCode(courses);
};
courseModels.getCourseByCode = async (courseCode) => {
  return await prisma.course.getCourseByCode({
    where: {
      courseCode: Number(courseCode),
    },
  });
};
courseModels.findCourseByCode = async (courseCode, section) => {
  return await prisma.course.findFirst({
    where: {
      courseCode,
      section,
    },
  });
};
courseModels.createCourse = async (
  courseCode,
  courseName,
  credits,
  seat,
  section,
  teacherId,
  courseSyllabusId,
  majorId
) => {
  return await prisma.course.create({
    data: {
      courseCode,
      courseName,
      credits,
      seat,
      section,
      teacherId,
      courseSyllabusId,
      majorId,
    },
  });
};
courseModels.editCourse = async (courseId, updateCourseInfo) => {
  return await prisma.course.update({
    where: {
      id: Number(courseId),
    },
    data: {
      courseCode: updateCourseInfo.courseCode,
      courseName: updateCourseInfo.courseName,
      credits: updateCourseInfo.credits,
      seat: updateCourseInfo.seat,
      section: updateCourseInfo.section,
      teacherId: updateCourseInfo.teacherId,
      courseSyllabusId: updateCourseInfo.courseSyllabusId,
    },
  });
};

courseModels.inactiveCourse = async (courseId) => {
  return await prisma.course.update({
    where: {
      id: Number(courseId),
    },
    data: {
      status: false,
    },
  });
};
courseModels.activeCourse = async (courseId) => {
  return await prisma.course.update({
    where: {
      id: Number(courseId),
    },
    data: {
      status: true,
    },
  });
};
courseModels.studentGetCourseSyllabus = async (studentId) => {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: {
      id: true,
      studentId: true,
      email: true,
      firstName: true,
      lastName: true,
      major: {
        select: {
          id: true,
          name: true,
          faculty: {
            select: { id: true, name: true },
          },
          courseRecommendation: {
            select: {
              id: true,
              year: true,
              recommendationType: true,
              course: {
                select: {
                  id: true,
                  courseCode: true,
                  courseName: true,
                  credits: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!student || !student.major || !student.major.courseRecommendation) {
    return null;
  }

  const sortedRecommendations = student.major.courseRecommendation.sort(
    (a, b) => a.id - b.id
  );

  const coursesGroupedByYear = {};
  const uniqueCourses = new Map();

  sortedRecommendations.forEach((rec) => {
    rec.course.forEach((course) => {
      if (!uniqueCourses.has(course.courseCode)) {
        uniqueCourses.set(course.courseCode, {
          ...course,
          recommendationType: rec.recommendationType,
        });

        if (!coursesGroupedByYear[rec.year]) {
          coursesGroupedByYear[rec.year] = {
            PREREQUISITES: [],
            OPTIONAL: [],
            SELECTION: [],
          };
        }

        if (rec.recommendationType === "PREREQUISITES") {
          coursesGroupedByYear[rec.year].PREREQUISITES.push(
            uniqueCourses.get(course.courseCode)
          );
        } else if (rec.recommendationType === "OPTIONAL") {
          coursesGroupedByYear[rec.year].OPTIONAL.push(
            uniqueCourses.get(course.courseCode)
          );
        } else if (rec.recommendationType === "SELECTION") {
          coursesGroupedByYear[rec.year].SELECTION.push(
            uniqueCourses.get(course.courseCode)
          );
        }
      }
    });
  });

  return {
    ...student,
    major: {
      ...student.major,
      courseRecommendation: coursesGroupedByYear,
    },
  };
};
courseModels.studentGetEnrollCourse = async (studentId) => {
  return await prisma.student.findUnique({
    where: {
      id: Number(studentId),
    },
    select: {
      id: true,
      studentId: true,
      email: true,
      firstName: true,
      lastName: true,
      enrollments: {
        select: {
          id: true,
          status: true,
          registrationDate: true,
          semester: true,
          course: {
            select: {
              id: true,
              courseCode: true,
              courseName: true,
              credits: true,
              section: true,
            },
          },
        },
      },
    },
  });
};
courseModels.studentGetEnrollCourseBySemester = async (studentId, semester) => {
  return await prisma.student.findUnique({
    where: {
      id: Number(studentId),
    },
    select: {
      id: true,
      studentId: true,
      email: true,
      firstName: true,
      lastName: true,
      enrollments: {
        where: {
          semester: semester,
        },
        select: {
          id: true,
          status: true,
          registrationDate: true,
          course: {
            select: {
              id: true,
              courseCode: true,
              courseName: true,
              credits: true,
              section: true,
            },
          },
        },
      },
    },
  });
};
courseModels.studentGetClassScheduleBySemester = async (
  studentId,
  semester
) => {
  return await prisma.enrollment.findMany({
    where: {
      studentId: studentId,
      semester: semester,
      status: "APPROVED",
    },
    include: {
      course: {
        include: {
          classSchedules: true,
        },
      },
    },
  });
};
courseModels.studentCreateEnroll = async (studentId, semester, courseId) => {
  const prerequisites = await prisma.conditionCourse.findMany({
    where: { courseId },
    select: {
      course: {
        select: {
          id: true,
          courseCode: true,
        },
      },
    },
  });

  if (prerequisites.length > 0) {
    const prerequisiteCourseIds = prerequisites.map(
      (prerequisite) => prerequisite.course.id
    );

    const completedPrerequisites = await prisma.grade.findMany({
      where: {
        studentId: Number(studentId),
        courseId: { in: prerequisiteCourseIds },
      },
      select: {
        letterGrade: true,
      },
    });

    const hasCompletedPrerequisites = completedPrerequisites.every(
      (grade) => grade.letterGrade !== "F"
    );

    if (
      !hasCompletedPrerequisites ||
      completedPrerequisites.length < prerequisites.length
    ) {
      return createError(
        400,
        "Prerequisite courses have not been completed, or a prerequisite course has a grade of F."
      );
    }
  }

  return await prisma.enrollment.create({
    data: {
      studentId: Number(studentId),
      semester,
      courseId: Number(courseId),
    },
  });
};
courseModels.studentCancelEnroll = async (enrollmentId) => {
  return await prisma.enrollment.update({
    where: {
      id: Number(enrollmentId),
    },
    data: {
      status: "CANCELLED",
    },
  });
};

courseModels.studentGetClassScheduleByCourseId = async (courseCode) => {
  // Step 1: Find all courses with the given courseCode
  const courses = await prisma.course.findMany({
    where: {
      courseCode: courseCode, // Find all courses with the same courseCode
    },
  });

  // If no courses found, return an empty array or handle accordingly
  if (courses.length === 0) {
    console.log("No courses found with that courseCode");
    return [];
  }

  // Step 2: Find all class schedules for all courses with the same courseCode
  const classSchedules = await prisma.classSchedule.findMany({
    where: {
      courseId: {
        in: courses.map((course) => course.id), // Get class schedules for all matching courseIds
      },
    },
    include: {
      course: true, // Include the related course information in the response
    },
  });

  // Step 3: Flatten the course data and merge it with classSchedules
  const flattenedClassSchedules = classSchedules.map((schedule) => {
    const { course, ...scheduleData } = schedule; // Extract the course object and the rest of the schedule data

    // Return a new object that combines the course fields with the schedule data
    return {
      ...scheduleData, // Keep the class schedule data
      courseCode: course.courseCode,
      courseName: course.courseName,
      credits: course.credits,
      seat: course.seat,
      section: course.section,
      status: course.status,
      teacherId: course.teacherId,
      courseSyllabusId: course.courseSyllabusId,
      majorId: course.majorId,
    };
  });

  return flattenedClassSchedules;
};

module.exports = courseModels;
