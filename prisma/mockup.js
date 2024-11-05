const mockUps = {};

mockUps.facultyData = [
    { "name": "Faculty of Science" },
    { "name": "Faculty of Law" },
    { "name": "Faculty of Engineering" },
    { "name": "Faculty of Business and Economics" },
    { "name": "Faculty of Communication and Media Studies" },

]
mockUps.majorData = [
    { "name": "Astronomy", "facultyId": 1 },
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
        "dateOfBirth": "2003-04-30T00:00:00.000Z",
        "address": "123 Maple Street, Los Angeles, CA, 90001, USA",
        "admitDate": "2021-06-07T00:00:00.000Z",
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
        "dateOfBirth": "2003-02-19T00:00:00.000Z",
        "address": "45 Oak Avenue, New York, NY, 10001, USA",
        "admitDate": "2021-06-07T00:00:00.000Z",
        "majorId": 1,
        "adviserId": 4,
        "email": "patricia.miller@pierre.university.edu",
        "gender": "FEMALE"
    },
    {
        "studentId": "640110003",
        "firstName": "Donald",
        "lastName": "Parker",
        "phone": "0853621879",
        "dateOfBirth": "2003-10-22T00:00:00.000Z",
        "address": "789 Pine Lane, Chicago, IL, 60601, USA",
        "admitDate": "2021-06-07T00:00:00.000Z",
        "majorId": 1,
        "adviserId": 5,
        "email": "Donald.Parker@pierre.university.edu",
        "password": "1234567890",
        "gender": "MALE"
    }
];

module.exports = mockUps