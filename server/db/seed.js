const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function main() {
    //seeding the specialty table
    await prisma.specialty.upsert({
        where: {specialtyName: 'Podiatry'},
        update: {},
        create: {
            specialtyName: 'Podiatry',
            recommendedFrequency: 6
        }
    });

    await prisma.specialty.upsert({
        where: {specialtyName: 'Primary Care'},
        update: {},
        create: {
            specialtyName: 'Primary Care',
            recommendedFrequency: 3
        }
    });

    await prisma.specialty.upsert({
        where: {specialtyName: 'Dentist'},
        update: {},
        create: {
            specialtyName: 'Dentist',
            recommendedFrequency: 6
        }
    });

    await prisma.specialty.upsert({
        where: {specialtyName: 'Ophthalmology'},
        update: {},
        create: {
            specialtyName: 'Ophthalmology',
            recommendedFrequency: 12
        }
    });

    await prisma.specialty.upsert({
        where: {specialtyName: 'Cardiology'},
        update: {},
        create: {
            specialtyName: 'Cardiology',
            recommendedFrequency: 12
        }
    });

    await prisma.specialty.upsert({
        where: {specialtyName: 'Nephrology'},
        update: {},
        create: {
            specialtyName: 'Nephrology',
            recommendedFrequency: 12
        }
    });

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })