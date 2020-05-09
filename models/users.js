const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
        //unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

const user = mongoose.model('User', UserSchema);
module.exports = user;