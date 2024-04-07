const express = require('express');
const usersRouter = express.Router();
const prisma = require('../db/client');

const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const {requireUser} = require('./utils');

// GET /api/users/test
usersRouter.get('/test', async function (req, res, next) {
    res.send('testing the users router!')
})

// GET /api/users/me - get single user information by id (req.user.id)
    // needs requireUser middleware


// POST /api/users/register - register new user


// POST /api/users/login - login existing user





module.exports = usersRouter;
