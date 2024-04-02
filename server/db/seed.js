const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

async function main() {
    // seeding the specialty table
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

    // seeding facility table 
    await prisma.facility.upsert({
        where: {name: 'The Brookhaven Center'},
        update: {},
        create: {
            name: 'The Brookhaven Center',
            address: '1059 Nelson Avenue',
            city: 'Bronx',
            state: 'New York',
            zipcode: '10453',
            doctor: {
                create: [
                    {
                        name: 'Dr. Samuel Smith',
                        phoneNumber: '(718) 293-8858',
                        specialtyId: 1
                    },
                    {
                        name: 'Dr. Alejandro Rodriguez',
                        phoneNumber: '(718) 293-8858',
                        specialtyId: 2
                    }
                ]
            }
        }
    });

    await prisma.facility.upsert({
        where: {name: 'Summerville Family Center'},
        update: {},
        create: {
            name: 'Summerville Family Center',
            address: '91-31 Woodhaven Blvd',
            city: 'Queens',
            state: 'New York',
            zipcode: '11421',
        }
    });

    await prisma.facility.upsert({
        where: {name: 'Advance Care Physicians'},
        update: {},
        create: {
            name: 'Advance Care Physicians',
            address: '2255 Myrtle Street',
            city: 'Brooklyn',
            state: 'New York',
            zipcode: '11201',
        }
    });

    await prisma.facility.upsert({
        where: {name: 'All Smiles Clinic'},
        update: {},
        create: {
            name: 'All Smiles Clinic',
            address: '2905 St. Nicholas Avenue',
            city: 'New York',
            state: 'New York',
            zipcode: '10036'
        }
    })

    // seeding doctor table
    await prisma.doctor.upsert({
        where: {name: 'Dr. Xing Xu'},
        update: {},
        create: {
            name: 'Dr. Xing Xu',
            phoneNumber: '(718) 344-9158',
            specialtyId: 2,
            facilityId: 2
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