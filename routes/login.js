const express = require('express');
const router = express.Router();

//Login Route
router.get('/', (req, res) => {
    res.render('login', { title: "Login" });
});

module.exports = router;