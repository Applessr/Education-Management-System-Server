const prisma = require('../../src/configs/prisma');
const adminModels = require('../../src/models/adminModels');


jest.mock('../../src/configs/prisma', () => ({
    employee: {
        findUnique: jest.fn(),
        create: jest.fn(),
        count: jest.fn(),
      },
      faculty: {
        count: jest.fn(),
        findMany: jest.fn(),
      },
      major: {
        findUnique: jest.fn(),
        count: jest.fn(),
      },
      course: {
        findMany: jest.fn(),
      },
      student: {
        count: jest.fn(),
        update: jest.fn(),
      },
}));

describe('adminModels', () => {
    afterEach(() => {
        jest.clearAllMocks();  
    });

    test('should find employee by email', async () => {
        const mockEmail = 'test@example.com';
        const mockEmployee = { id: 1, email: mockEmail, firstName: 'John', lastName: 'Doe' };

        prisma.employee.findUnique.mockResolvedValue(mockEmployee); 

        const result = await adminModels.findEmail(mockEmail);

        expect(result).toEqual(mockEmployee);
        expect(prisma.employee.findUnique).toHaveBeenCalledWith({
            where: { email: mockEmail },
        });
    });

    test('should create a new employee', async () => {
        const newEmployeeData = { email: 'new@example.com', firstName: 'Jane', lastName: 'Doe' };
        const createdEmployee = { id: 2, ...newEmployeeData };

        prisma.employee.create.mockResolvedValue(createdEmployee);

        const result = await adminModels.createEmployee(newEmployeeData);

        expect(result).toEqual(createdEmployee);
        expect(prisma.employee.create).toHaveBeenCalledWith({
            data: newEmployeeData,
        });
    });

    test('should get overall statistics', async () => {
        const mockTeacherCount = 5;
        const mockFacultyCount = 3;
        const mockTeacherFaculty = [
            { id: 1, name: 'Faculty A', majors: [{ employee: [{ id: 1 }] }] },
            { id: 2, name: 'Faculty B', majors: [{ employee: [{ id: 2 }] }] },
        ];
        const mockMajorCount = 10;
        const mockUniqueCourses = [{ courseCode: 'CS101' }, { courseCode: 'CS102' }];
        const mockStudentCount = 100;
        const mockMaleStudentCount = 50;
        const mockFemaleStudentCount = 50;
    
        prisma.employee.count.mockResolvedValueOnce(mockTeacherCount);
        prisma.faculty.count.mockResolvedValueOnce(mockFacultyCount);
        prisma.faculty.findMany.mockResolvedValueOnce(mockTeacherFaculty); 
        prisma.major.count.mockResolvedValueOnce(mockMajorCount);
        prisma.course.findMany.mockResolvedValueOnce(mockUniqueCourses);
        prisma.student.count.mockResolvedValueOnce(mockStudentCount); 
        prisma.student.count.mockResolvedValueOnce(mockMaleStudentCount);
        prisma.student.count.mockResolvedValueOnce(mockFemaleStudentCount); 
    
        const mockStudentFaculty = [
            { 
                id: 1, 
                name: 'Faculty A', 
                majors: [{ students: [{ id: 1 }, { id: 2 }] }] 
            },
            { 
                id: 2, 
                name: 'Faculty B', 
                majors: [{ students: [{ id: 3 }] }] 
            }
        ];
        prisma.faculty.findMany.mockResolvedValueOnce(mockStudentFaculty); 
    
        const result = await adminModels.overAll();
    
        expect(result.teacher).toBe(mockTeacherCount);
        expect(result.faculty).toBe(mockFacultyCount);
        expect(result.facultyTeacherCount).toHaveLength(2); 
        expect(result.major).toBe(mockMajorCount);
        expect(result.subject).toBe(mockUniqueCourses.length);
        expect(result.student).toBe(mockStudentCount);
        expect(result.maleStudent).toBe(mockMaleStudentCount);
        expect(result.femaleStudent).toBe(mockFemaleStudentCount);
        expect(result.facultyStudentCount).toHaveLength(2); 
    });

    test('should change student status', async () => {
        const studentId = 1;
        const status = 'INACTIVE';
        const updatedStudent = { id: studentId, status };

        prisma.student.update.mockResolvedValue(updatedStudent);

        const result = await adminModels.changeStudentStatus(studentId, status);

        expect(result).toEqual(updatedStudent);
        expect(prisma.student.update).toHaveBeenCalledWith({
            where: { id: studentId },
            data: { status: status },
        });
    });

    test('should fetch course syllabus by major id and year', async () => {
        const majorId = 1;
        const year = '2';
        const mockCourseSyllabus = {
            id: majorId,
            name: 'Computer Science',
            courseRecommendation: [
                {
                    year: 2,
                    recommendationType: 'PREREQUISITES',
                    course: [
                        { courseCode: 'CS100', courseName: 'Intro to CS', credits: 3, ConditionCourse: [{ prerequisiteCourseCode: 'CS101' }] }
                    ]
                }
            ],
            faculty: { name: 'Faculty of Engineering' },
        };

        prisma.major.findUnique.mockResolvedValue(mockCourseSyllabus);

        const result = await adminModels.courseSyllabus(majorId, year);

        expect(result.major.id).toBe(majorId);
        expect(result.major.courseRecommendation[2].PREREQUISITES).toHaveLength(1);
        expect(result.major.courseRecommendation[2].PREREQUISITES[0].courseCode).toBe('CS100');
    });
});