const mockUps = {};

mockUps.facultyData = [
    { "name": "Faculty of Science" },
    { "name": "Faculty of Law" },
    { "name": "Faculty of Engineering" },
    { "name": "Faculty of Business and Economics" },
    { "name": "Faculty of Communication and Media Studies" },

]
mockUps.majorData = [
    { "name": "Physics", "facultyId": 1 },
    { "name": "Chemistry", "facultyId": 1 },
    { "name": "Criminal Law", "facultyId": 2 },
    { "name": "International Law", "facultyId": 2 },
    { "name": "Software Engineering", "facultyId": 3 },
    { "name": "Mechanical Engineering", "facultyId": 3 },
    { "name": "Business Administration", "facultyId": 4 },
    { "name": "Accounting", "facultyId": 4 },
    { "name": "Digital Media", "facultyId": 5 },
    { "name": "Film and Television Studies", "facultyId": 5 },
]

mockUps.studentData = mockUps.studentData = [
    {
        "studentId": "640110001",
        "firstName": "Elizabeth",
        "lastName": "Wilson",
        "phone": "0853621877",
        "dateOfBirth": new Date(2003, 4, 30),
        "address": "123 Maple Street, Los Angeles, CA, 90001, USA",
        "admitDate": new Date(2021, 5, 7),
        "majorId": 1,
        "adviserId": 4,
        "email": "elizabeth.wilson@pierre.university.edu",
        "gender": "FEMALE"
    },
    {
        "studentId": "640110002",
        "firstName": "Patricia",
        "lastName": "Miller",
        "phone": "0853621878",
        "dateOfBirth": new Date(2003, 2, 19),
        "address": "45 Oak Avenue, New York, NY, 10001, USA",
        "admitDate": new Date(2021, 5, 7),
        "majorId": 1,
        "adviserId": 4,
        "email": "patricia.miller@pierre.university.edu",
        "gender": "FEMALE"
    }
];

module.exports = mockUps