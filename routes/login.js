const express = require('express');
const router = express.Router();
const User = require('../models/users');
//Display Login Form
router.get('/', (req, res) => {
    res.render('login', { title: "Login" });
});

//Handle Login
router.post('/', (req, res) => {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error) {
                const error = new Error("Wrong email or password");
                error.status = 401;
                res.render('error', { error });
            } else {
                req.session.userID = user._id;
                res.render('profile', { title: 'Profile' });
            }
        });
    } else {
        const error = new Error("Email and password are required");
        error.status = 401;
        res.render('error', { error })
    }
});

module.exports = router;