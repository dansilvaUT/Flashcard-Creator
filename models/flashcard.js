'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Flashcard extends Sequelize.Model { }
    Flashcard.init({
        question: Sequelize.STRING,
        answer: Sequelize.STRING
    }, { sequelize });

    return Flashcard;
};