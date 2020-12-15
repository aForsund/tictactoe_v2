const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  instance: {
    type: Object,
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
  outcome: {
    type: String
  }
});

module.exports = mongoose.model('Game', gameSchema);