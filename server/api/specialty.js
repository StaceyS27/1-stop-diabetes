const express = require('express');
const specialtyRouter = express.Router();
const prisma = require('../db/client');

// GET /api/specialty/test
specialtyRouter.get('/test', async function (req, res, next) {
    res.send('testing the specialty subrouter!')
});

// GET /api/specialty - get all specialties with respective doctors


// GET /api/specialty/:specialtyId - get single specialty wih doctors




module.exports = specialtyRouter; 