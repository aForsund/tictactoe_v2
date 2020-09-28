const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    player1: {
        type: String,
        required: true
    },
    player2: {
        type: Number,
        required: true,
        
    },
    gameHistory: {
        type: Array
    }

});

module.exports = mongoose.model('Game', gameSchema);