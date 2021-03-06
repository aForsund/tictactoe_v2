const express = require('express');
const router = express.Router();
const Game = require('../models/game');
//const passport = require('passport');

//Remove if not required - add function to update token on user interaction
const utils = require('../lib/utils');



//Get one game
router.get('/search/:id', async (req, res) => {

  //check if jwt payload matches request name....
  console.log(`searching for ${req.params.id}...`);
  try {
    let search = await Game.findOne({
      id: req.params.id
    });
    console.log('response from DB game id: ', search);
    res.json(search);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;