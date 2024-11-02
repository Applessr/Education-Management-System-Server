require('dotenv').config()

const prisma = require('.././src/configs/prisma')

async function run() {
    try {
        await prisma.$executeRawUnsafe('DROP DATABASE pierre_university_project');
        await prisma.$executeRawUnsafe('CREATE DATABASE pierre_university_project');
    } catch (err) {
        console.log('error in reset DB', err);
    }
}
console.log('Reset DB..');
run();