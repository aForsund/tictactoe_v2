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
    salt: String,
    notifications: Array,
    lastOutcomes: {
      type: Array,
      default: []
    },
    gameHistory: {
      type: Array,
      default: []
    }
});

module.exports = mongoose.model('User', userSchema);