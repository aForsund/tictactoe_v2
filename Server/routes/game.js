require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Game = mongoose.model('Game');
const passport = require('passport');

//Remove if not required - add function to update token on user interaction?
const utils = require('../lib/utils');


//Get all games
router.get('/', (req, res) => {
    res.send('Hello World');
})

//Get one game
router.get('/:id', (req, res) => {

})

//Save game
router.post('/', (req, res) => {

})
//Update user
router.post('/:id', (req, res) => {

})

module.exports = router;