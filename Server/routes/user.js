const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const utils = require('../lib/utils');



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



//Search users
router.get('/search/:name', passport.authenticate('jwt', { session: false }), async function (req, res) {
	try {
		let search = await User.find({
			username: { $regex: req.params.name, $options: 'i' },
		});
		res.json(search);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});



//Get challenges from DB
router.get('/challenges/:name', async (req, res) => {
  
  //check if jwt payload matches request name
  
  try {
    let search = await User.findOne({
      username: req.params.name 
    });
    res.json(search.notifications);
  } catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Test JWT...
router.get('/posts', utils.isAuth(), (req, res) => {
	console.log('hello from /posts')
	const decodedToken = utils.getUserFromHeader(req);
	console.log(decodedToken);
	res.json('Great Success');
});





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



module.exports = router;