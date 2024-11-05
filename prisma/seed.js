const prisma = require('../src/configs/prisma');
const mockUps = require('./mockup');


console.log('DB seed...')

async function run() {
    await prisma.faculty.createMany({ data: mockUps.facultyData })
    await prisma.major.createMany({ data: mockUps.majorData })
    // await prisma.student.createMany({ data: mockUps.studentData })
}

run();