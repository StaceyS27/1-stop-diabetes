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
});

// GET /api/users/me - get single user information by id (req.user.id)
usersRouter.get('/me', requireUser, async function (req, res, next) {
    try {
        const singleUser = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
        });
        res.send(singleUser);
    } catch {
        next({
            message: 'Unable to get single user information.'
        });
    }
});


// POST /api/users/register - register new user
usersRouter.post('/register', async function (req, res, next) {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    try {
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        if(userWithSameEmail) {
            res.status(401)
            next({
                message: 'Email already exists.'
            })
        } else {
            const newUser = await prisma.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                }
            });

            delete newUser.password;

            const token = jwt.sign({id: newUser.id}, JWT_SECRET);

            res.status(200).send({
                user: newUser,
                token: token
            });
        }
    } catch (error) {
        console.error(error);
        next({
            message: "Unable to register."
        })
    }
});

// POST /api/users/login - login existing user






module.exports = usersRouter;
