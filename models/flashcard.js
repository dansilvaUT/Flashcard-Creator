const mongoose = require('mongoose');
const FlashcardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    }

},{ timestamps: { createdAt: 'created_at' } });

const flashcard = mongoose.model('Flashcard', FlashcardSchema);
module.exports = flashcard;