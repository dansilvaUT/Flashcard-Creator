const express = require('express');
const router = express.Router();
const Flashcard = require('../models').Flashcard;

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
router.post('/', asyncHandler(async (req, res) => {
    const card = await Flashcard.create(req.body);
    res.redirect('addcard');
    // let card;
    // try {
    //     card = await Flashcard.create(req.body);
    //     res.redirect("/cards/" + card.id);
    // } catch (error) {
    //     if (error.name === "SequelizeValidationError") {
    //         card = await Flashcard.build(req.body);
    //         res.render("card", { card, errors: error.errors, title: 'Flashcards' })
    //     } else {
    //         throw error;
    //     }
    // }
}));

module.exports = router;