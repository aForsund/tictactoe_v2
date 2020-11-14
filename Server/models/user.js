const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    gamesPlayed: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 1200
    },
    hash: String,
    salt: String

});

module.exports = mongoose.model('User', userSchema);