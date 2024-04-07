// function checks if user is logged in/registered to have special access
function requireUser(req, res, next) {
    if(!req.user) {
        res.send({
            error: 'MissingUserError',
            message: 'You must be logged in to perform this action.'
        })
    } else {
        next();
    }
};


module.exports = {requireUser}