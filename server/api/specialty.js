const express = require('express');
const specialtyRouter = express.Router();
const prisma = require('../db/client');

// GET /api/specialty - get all specialties with respective doctors
specialtyRouter.get('/', async function (req, res, next) {
    try {
        const allSpecialities = await prisma.specialty.findMany({
            include: {
                doctor: true
            }
        });
    
        res.send(allSpecialities);

    } catch (error) {
        next({
            message: 'Unable to list all specialties.'
        })
    }    
});

// GET /api/specialty/:specialtyId - get single specialty with doctors
specialtyRouter.get('/:specialtyId', async function (req, res, next) {
    try {
        const singleSpecialty = await prisma.specialty.findUnique({
            where: {
                id: Number(req.params.specialtyId)
            },
            include: {
                doctor: true 
            }
        });

        res.send(singleSpecialty);
    } catch (error) {
        next({
            message: 'Unable to get individual specialty.'
        })
    }
});



module.exports = specialtyRouter; 