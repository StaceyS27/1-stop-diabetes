const express = require("express");
const doctorsRouter = express.Router();
const prisma = require("../db/client");

// GET /api/doctors/test
doctorsRouter.get('/test', async function (req, res, next) {
    res.send('testing the doctors router!')
});

// GET /api/doctors - get all doctors with specialty & facility
doctorsRouter.get('/', async function (req, res, next) {
    try {
        const allDoctors = await prisma.doctor.findMany({
            include: {
                specialty: true,
                facility: true,
            }
        });

        res.send(allDoctors);

    } catch (error) {
        next({
            message: 'Unable to get all doctors.'
        })
    }
});

// GET /api/doctors/:doctorId - get single doctor information 
doctorsRouter.get('/:doctorId', async function (req, res, next) {
    try {
        const singleDoctor = await prisma.doctor.findUnique({
            where : {
                id: Number(req.params.doctorId)
            },
            include: {
                specialty: true, 
                facility: true,
            }
        });

        res.send(singleDoctor)
    } catch (error) {
        next({
            message: 'Unable to get individual doctor information.'
        })
    }
});



module.exports = doctorsRouter;