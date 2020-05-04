const express = require('express');
const router = express.Router();
//const Flashcard = require('../models').Flashcard;

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

router.get("/", (req, res) => {
    res.render('cards', { title: 'Flashcards' });
});

//Get card based on id
router.get("/:id", (req, res) => {
    let { side } = req.query;
    const { id } = req.params;
    if (!side) {
        res.redirect(`/cards/${id}?side=question`)
    }
    const question = cards[id][side];
    const { hint } = cards[id];
    const templateData = { id, question };
    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }

    res.render("cards", templateData);
});

module.exports = router;