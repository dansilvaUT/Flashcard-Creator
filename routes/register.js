const express = require('express');
const router = express.Router();
const User = require('../models/users');

/* Handler function to wrap each route. */
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

//Get Register From
router.get('/', (req, res) => {
    res.render('register', { title: "Sign Up" });
});

//Create User
//TODO clean up, add better error handling. Also fix the promise 
router.post('/', asyncHandler(async (req, res) => {
    let user;
    if (req.body.email && req.body.username && req.body.password && req.body.confirmPassword) {
        if (req.body.password != req.body.confirmPassword) {
            const err = new Error("Passwords do not match");
            res.render('error', { error: err });
        } else {
            user = await User.create(req.body);
            res.redirect('/');
        }

    } else {
        res.render('error');
    }
}));

module.exports = router;