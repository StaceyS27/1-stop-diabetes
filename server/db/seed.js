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

    // seeding facility table & some associated doctors
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
            zipcode: '10036',
            doctor: {
                create: [
                    {
                        name: 'Dr. Grace Adebayo',
                        phoneNumber: '(212) 351-8001',
                        specialtyId: 3
                    },
                    {
                        name: 'Dr. Huyen Winnie',
                        phoneNumber: '(212) 351-8005',
                        specialtyId: 3
                    },
                    {
                        name: 'Dr. Rebecca Simmons',
                        phoneNumber: '(212) 351-8008',
                        specialtyId: 3
                    }
                ]
            }
        }
    });

   

    await prisma.facility.upsert({
        where: {name: 'The Eye and Surgery Center'},
        update: {},
        create: {
            name: 'The Eye and Surgery Center',
            address: '2233 Madison Avenue',
            city: 'New York',
            state: 'New York',
            zipcode: '10029',
            doctor: {
                create: [
                    {
                        name: 'Dr. Elie Islam',
                        phoneNumber: '(212) 891-7843',
                        specialtyId: 4
                    },
                    {
                        name: 'Dr. James Kelly',
                        phoneNumber: '(212) 981-7841',
                        specialtyId: 4
                    },
                    {
                        name: 'Dr. Luz Rivera',
                        phoneNumber: '(212) 981-7848',
                        specialtyId: 4
                    }
                ]
            }
        }
    });

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

    await prisma.doctor.upsert({
        where: {name: 'Dr. Muhammed Ahmed'},
        update: {name: 'Dr. Muhammed Ahmed'},
        create: {
            name: 'Dr. Muhammed Ahmed',
            phoneNumber: '(718) 344-9157',
            specialtyId: 5,
            facilityId: 2
        }
    });

    await prisma.doctor.upsert({
        where: {name: 'Dr. Janiki Kanamil'},
        update: {},
        create: {
            name: 'Dr. Janiki Kanamil',
            phoneNumber: '(718) 981-0154',
            specialtyId: 2,
            facilityId: 3,
        }
    });

    await prisma.doctor.upsert({
        where: {name: 'Dr. Anna Kazaresha'},
        update: {},
        create: {
            name: 'Dr. Anna Kazaresha',
            phoneNumber: '(718) 293-8851',
            specialtyId: 5,
            facilityId: 1,
        }
    });
    
    await prisma.doctor.upsert({
        where: {name: 'Dr. Paolina Campos'},
        update: {},
        create: {
            name: 'Dr. Paolina Campos',
            phoneNumber: '(718) 293-8852',
            specialtyId: 6,
            facilityId: 1,
        }
    });
 
    await prisma.doctor.upsert({
        where: {name: 'Dr. Gerald Newburg'},
        update: {},
        create: {
            name: 'Dr. Gerald Newburg',
            phoneNumber: '(718) 344-9156',
            specialtyId: 1,
            facilityId: 2
        }
    });

    await prisma.doctor.upsert({
        where: {name: 'Dr. Victoria Linares'},
        update: {},
        create: {
            name: 'Dr. Victoria Linares',
            phoneNumber: '(718) 344-9151',
            specialtyId: 6,
            facilityId: 2,
        }
    });

    await prisma.doctor.upsert({
        where: {name: 'Dr. John Lee'},
        update: {},
        create: {
            name: 'Dr. John Lee',
            phoneNumber: '(718) 981-0154',
            specialtyId: 5,
            facilityId: 3
        }
    });

    await prisma.doctor.upsert({
        where: {name: 'Dr. Michelle Rosenblatt'},
        update: {},
        create: {
            name: 'Dr. Michelle Rosenblatt',
            phoneNumber: '(718) 981-0151',
            specialtyId: 1,
            facilityId: 3
        }
    });

    await prisma.doctor.upsert({
        where: {name: 'Dr. Oluwatosin Bambola'},
        update: {},
        create: {
            name: 'Dr. Oluwatosin Bambola',
            phoneNumber: '(718) 981-0152',
            specialtyId: 6,
            facilityId: 3
        }
    })


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