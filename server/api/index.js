const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = process.env

const prisma = require('../db/client')

//testing functionality of the api router
apiRouter.get('/', (req, res, next) => {
    res.send('this is the apiRouter')
});



module.exports = apiRouter