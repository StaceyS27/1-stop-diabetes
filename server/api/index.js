const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = process.env

const prisma = require('../db/client')

//testing functionality of the api router
apiRouter.get('/', (req, res, next) => {
    res.send('this is the apiRouter')
});

//set "req.user"
apiRouter.use(async function (req, res, next) {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if(!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const payload = jwt.verify(token, JWT_SECRET);
            const id = payload.id

            if(id) {
                req.user = await prisma.user.findUnique({
                    where: {
                        id: id
                    }
                })
                next();
            } else {
                res.status(401).send({
                    message: 'Authorization token malformed'
                });
            }
            console.log(req.user)
        } catch (error) {
            next({error})
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: 'Authorization token must start with ' + prefix
        })
    }
});

//subrouters of apiRouter
const usersRouter = require('./users')
apiRouter.use('/users', usersRouter);

const doctorsRouter = require('./doctors')
apiRouter.use('/doctors', doctorsRouter);

const specialtyRouter = require('./specialty')
apiRouter.use('/specialty', specialtyRouter);



module.exports = apiRouter