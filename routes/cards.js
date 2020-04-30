const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcard-data.json');
const { cards } = data;

//Random cards
router.get('/', (req, res) => {
    const numOfCards = cards.length;
    const flashCardID = Math.floor(Math.random() * numOfCards);
    res.redirect(`/cards/${flashCardID}?side=question`);
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