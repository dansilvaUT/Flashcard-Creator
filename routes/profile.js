const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', (req, res) => {
    if (!req.session.userID) {
        const error = new Error("You need to login to access this page");
        res.render('error', { error });
    }
    User.findById(req.session.userID)
        .exec((error, user) => {
            if (error) {
                const error = new Error();
                res.render('error', { error });
            } else {
                res.render('profile', { title: "Profile" });
            }
        })
});

module.exports = router;