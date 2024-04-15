const express = require("express");
const appointmentsRouter = express.Router();
const prisma = require("../db/client");

const {requireUser, setDateTime } = require("./utils")

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

// PUT /api/appointments/:appointmentId - edit appointment details
 appointmentsRouter.put('/:appointmentId', requireUser, async function (req, res, next){
    try{
        const updatedAppointment = await prisma.appointment.update({
            where: {
                id: Number(req.params.appointmentId),
            },
            data: {
                userId: req.user.id,
                doctorId: req.body.doctorId,
                lastVisit: setDateTime(req.body.lastVisit),
                nextVisit: setDateTime(req.body.nextVisit),
                frequencyOfVisit: req.body.frequencyOfVisit,
                status: req.body.status,
            }
        });
        res.send(updatedAppointment);
    } catch (error) {
        console.error(error);
        next({
            message: "Unable to update the appointment.",
        })
    }
 });

// DELETE /api/appointments/:appointmentId - delete appointment 
appointmentsRouter.delete('/:appointmentId', requireUser, async function (req, res, next) {
    try {
        const deletedAppointment = await prisma.appointment.delete({
            where: {
                id: Number(req.params.appointmentId),
            }
        });
        res.send({
            message: 'Appointment successfully deleted.',
            deletedAppointment
        });
    } catch (error) {
        next({
            message: 'Unable to delete appointment.'
        })
    }
});


module.exports = appointmentsRouter; 
