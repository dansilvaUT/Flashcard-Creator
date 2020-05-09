const express = require('express');
const router = express.Router();
const Flashcard = require('../models/flashcard');


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

//Get All Cards
router.get('/', asyncHandler(async (req, res) => {
    let cards = await Flashcard.findAll();
    res.render('cards', { cards, title: 'Flashcards' });
}));

//Add New Card Form
router.get('/new', (req, res) => {
    res.render('addcard', { title: 'Add New Flahscards' });
});

//Post a new question
router.post('/new', asyncHandler(async (req, res) => {
    let flashcard;
    if (req.body.question && req.body.answer) {
        flashcard = await Flashcard.create(req.body);
        //TODO implement flash message here.
        res.redirect('/');

    } else {
        const error = new Error('All Fields required');
        res.render('error', { error });
    }

}));

module.exports = router;