const express = require('express');
const router = express.Router();

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