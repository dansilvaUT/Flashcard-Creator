const express = require('express');
const router = express.Router();

//Register Route
router.get('/', (req, res) => {
    res.render('register', {title: "Sign Up"});
});

module.exports = router;