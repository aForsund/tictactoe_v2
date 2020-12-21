const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  playerX_id: {
    type: String,
    required: true
  },
  playerO_id: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  started: {
    type: Boolean,
    required: true
  },
  lastUpdate: {
    type: Number,
    required: true
  },
  playerOne: {
    type: Object,
    required: true
  },
  playerTwo: {
    type: Object,
    required: true
  },
  game: {
    type: Object,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
    
  

});

module.exports = mongoose.model('Game', gameSchema);