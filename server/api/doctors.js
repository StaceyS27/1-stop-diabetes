const express = require("express");
const doctorsRouter = express.Router();
const prisma = require("../db/client");

// GET /api/doctors/test
doctorsRouter.get('/test', async function (req, res, next) {
    res.send('testing the doctors router!')
});

// GET /api/doctors - get all doctors with specialty & facility

// GET /api/doctors/:doctorId




module.exports = doctorsRouter;