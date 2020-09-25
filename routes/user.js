const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const getUser = async (req, res, next) => {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: 'Cannot find user' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.user = user;
	next();
};

//Get all users
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Get one user
router.get('/:id', getUser, (req, res) => {
	res.json(res.user);
});

//Update user
router.patch(
	'/:id',
	getUser,
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		console.log('user is authenticated...');
		if (req.body.name != null) {
			res.user.name = req.body.name;
		}
		if (req.body.rating != null) {
			res.user.rating = req.body.rating;
		}
		if (req.body.gamesPlayed != null) {
			res.user.gamesPlayed = req.body.gamesPlayed;
		}
		try {
			const updatedUser = await res.user.save();
			console.log(`updated... ${updatedUser}`);
			res.json(updatedUser);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	}
);

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log(err);
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

//Search users
router.get('/search/:name', async function (req, res) {
	try {
		let search = await User.find({
			username: { $regex: req.params.name, $options: 'i' },
		});
		res.json(search);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Test JWT

router.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		res.status(200).json({
			success: true,
			msg: 'You are successfully authenticated to this route!',
		});
	}
);

router.get('/posts', authenticateToken, (req, res) => {
	res.json('Great success!');
});

module.exports = router;
