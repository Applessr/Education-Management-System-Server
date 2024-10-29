const { PrismaClient } = require('@prisma/client');
const prisma = require('../../src/configs/prisma')

describe('prisma config', () => {
    it('should be defined', () => {
        const result = prisma

        expect(result).toBeDefined();
    });
    
    it('should be an instance of PrismaClient', () => {

        const expected = PrismaClient
        const result = prisma
        expect(result).toBeInstanceOf(expected);
    });

    it('should connect to the database', async () => {
        await expect(prisma.$connect()).resolves.not.toThrow();
    });

    it('should execute a raw query', async () => {
        const result = await prisma.$executeRaw`SELECT 1;`;
        expect(result).toBe(1);
    });

    afterAll(async () => {
        await expect(prisma.$disconnect()).resolves.not.toThrow();
    });
})