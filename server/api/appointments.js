const express = require("express");
const appointmentsRouter = express.Router();
const prisma = require("../db/client");

const {requireUser} = require("./utils")

// GET /api/appointments - get all appointments by userId (req.user.id)
appointmentsRouter.get('/', requireUser, async function (req, res, next) {
    try {
        const userAppointments = await prisma.appointment.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                doctor: {
                    include: {
                        specialty: true,
                        facility: true
                    }
                }
            }
        })
        res.send(userAppointments)
    } catch (error) {
        next({
            message: "Unable to get all of the user's appointments."
        })
    }
});

// POST /api/appointments - post new appointments 

// PUT /api/appointments/:appointmentId - edit appointment details 

// DELETE /api/appointments/:appointmentId - delete appointment 



module.exports = appointmentsRouter; 
