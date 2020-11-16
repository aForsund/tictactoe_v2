const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model('User');
const utils = require('../lib/utils');
const passport = require('passport');
//const jwt = require('jsonwebtoken');

//Register new user
router.post('/register', async (req, res, next) => {
	console.log('register user...');
	User.findOne({ username: req.body.username })
		.then((user) => {
			if (user) return res.status(403).json({ success: false, msg: 'user already exists..' });
			else {
				const saltHash = utils.genPassword(req.body.password);

				const salt = saltHash.salt;
				const hash = saltHash.hash;

				const user = new User({
					username: req.body.username,
					hash: hash,
					salt: salt,
				});

				user.save()
					.then((user) => {
						const jwt = utils.issueJWT(user);
						res.json({
						success: true,
						user: user,
						token: jwt.token,
						exiresIn: jwt.expires,
					});
					})
					.catch((err) => {
						next(err);
						//res.status(500).json({message: err.message});
					});
			}
		})
		.catch(err => {
			next(err);
		});
		
	
	
});

//Login existing user
router.post('/login', (req, res, next) => {
		
	User.findOne({ username: req.body.username })
	.then((user) => {
	
			if (user) {
				const isValid = utils.validPassword(
					req.body.password,
					user.hash,
					user.salt
				);	
				if (isValid) {
					const jwt = utils.issueJWT(user);
					res.status(200).json({
						success: true,
						token: jwt.token,
						expiresIn: jwt.expires,
					});
					
					
				} else {
					res.status(401).json({ success: false, message: 'wrong password' });
				}	
			} else {
				res.status(404).json({ success: false, message: "could not find user.." });
			}
			
			

	



			
		})
		.catch((err) => next(err));
});

router.get('/testjwt', utils.isAuth , async (req, res, next) => {
	try {
	res.status(200).json({
		success: true,
		msg: 'You are successfully authenticated to this route!',
	});
} catch (err) {
	console.log(err);
}
}
);

module.exports = router;
