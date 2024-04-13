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
appointmentsRouter.post('/', requireUser, async function (req, res, next) {
    function setDateTime(stringTime) {
        if(!stringTime) {
            return null;
        } else {
            return new Date(stringTime);
        }
    }

    try {
        const newAppointment = await prisma.appointment.create({
            data: {
                userId: req.user.id,
                doctorId: req.body.doctorId,
                lastVisit: setDateTime(req.body.lastVisit),
                nextVisit: setDateTime(req.body.nextVisit),
                frequencyOfVisit: req.body.frequencyOfVisit,
                status: req.body.status
            }
        })
        res.send(newAppointment)
    } catch (error) {
        next({
            message: 'Unable to add appointment for user.'
        })
    }
});

// ** TODO: look up why time in database is 4 hrs ahead for some times and 5 for others
// try to learn and fix time insertion 



// PUT /api/appointments/:appointmentId - edit appointment details 

// DELETE /api/appointments/:appointmentId - delete appointment 



module.exports = appointmentsRouter; 
