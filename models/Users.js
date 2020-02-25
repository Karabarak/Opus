const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    log: {
        type: Array,
        default: new Date()
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
