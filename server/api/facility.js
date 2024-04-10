const express = require("express");
const facilityRouter = express.Router();
const prisma = require("../db/client");

// GET /api/facility - get all facilities with associated doctors
facilityRouter.get('/', async function (req, res, next) {
    try {
        const allFacilities = await prisma.facility.findMany({
            include: {
                doctor: true
            }
        });
        res.send(allFacilities)
    } catch (error) {
        next({
            message: 'Unable to get list of all facilities.'
        })
    }
});

// GET /api/facility/:facilityId - get single facility w/ doctors
facilityRouter.get('/:facilityId', async function (req, res, next) {
    try {
        const singleFacility = await prisma.facility.findUnique({
            where: {
                id: Number(req.params.facilityId)
            },
            include: {
                doctor: true
            }
        });
        res.send(singleFacility);
    } catch (error) {
        next({
            message: 'Unable to get single facility information.'
        })
    }
});

module.exports = facilityRouter;