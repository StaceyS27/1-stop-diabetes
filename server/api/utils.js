// function checks if user is logged in/registered to have special access
function requireUser(req, res, next) {
    if (!req.user) {
        res.send({
            error: 'MissingUserError',
            message: 'You must be logged in to perform this action.'
        })
    } else {
        next();
    }
};

// function takes ISO representation of date and time and forms a date object
    // instance of date constructor 
function setDateTime(stringDateTime) {
    if (!stringDateTime) {                      // if none provided, like empty field, return null
        return null;
    } else {
        return new Date(stringDateTime);
    }
};


module.exports = {
    requireUser,
    setDateTime
}