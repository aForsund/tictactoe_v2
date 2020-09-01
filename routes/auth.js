require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const utils = require('../lib/utils');

//Register new user
router.post('/register', async (req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const user = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });

    user.save()
        .then(user => {
            const jwt = utils.issueJWT(user);
            res.json({ success: true, user: user, token: jwt.token, exiresIn: jwt.expires });
            //res.status(201).json(newUser);
        })
        .catch(err => {
            next(err);
            //res.status(500).json({message: err.message});
        })
    
});


//Login existing user
router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {

                res.status(401).json({ success: false, msg: "could not find user.." });
            }
            
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {
                const tokenObject = utils.issueJWT(user);
                res.status(200).json({ success: true, user: user, token: tokenObject, expiresIn: tokenObject.expires });
            } else {
                res.status(401).json({ success: false, msg: "wrong password" });
            }
        })
        .catch(err => next(err));
        
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

const posts = ['abc', 'def'];

router.get('/posts', (req, res) => {
    res.json(posts);
});

module.exports = router;