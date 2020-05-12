const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

UserSchema.statics.authenticate = (email, password, cb) => {
    User.findOne({ email: email })
        .exec((error, user) => {
            if (error) {
                cb(error);
            } else if (!user) {
                const error = new Error("User not found");
                error.status = 401;
                cb(error);
            }
            bcrypt.compare(password, user.password, function (error, result) {
                if (result === true) {
                    cb(null, user);
                } else {
                    cb();
                }
            });
        })
}

UserSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (error, hash) {
        if (error) {
            console.log("Error:", error);
        } else {
            user.password = hash;
            next();
        }
    });
});
const User = mongoose.model('User', UserSchema);
module.exports = User;