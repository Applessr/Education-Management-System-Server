require('dotenv').config()

const prisma = require('.././src/configs/prisma')

async function run() {
    try {
        await prisma.$executeRawUnsafe('DROP DATABASE ems_group_project');
        await prisma.$executeRawUnsafe('CREATE DATABASE ems_group_project');
    } catch (err) {
        console.log('error in reset DB', err);
    }
}
console.log('Reset DB..');
run();