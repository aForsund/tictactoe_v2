const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const pathToKey = path.join(__dirname, '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf-8');

const validPassword = (password, hash, salt) => {
	let hashVerify = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
		.toString('hex');
	return hash === hashVerify;
};

const genPassword = (password) => {
	let salt = crypto.randomBytes(32).toString('hex');
	let genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
		.toString('hex');
	return {
		salt: salt,
		hash: genHash,
	};
};

const issueJWT = (user) => {
	const _id = user._id;
	const expiresIn = '1d';

	const payload = {
		sub: _id,
		iat: Date.now(),
	};

	const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
		expiresIn: expiresIn,
		algorithm: 'RS256',
	});

	return {
		token: 'Bearer ' + signedToken,
		expires: expiresIn,
	};
};

const isAuth = () => {
	return passport.authenticate('jwt', { session: false });
};

module.exports.isAuth = isAuth;
module.exports.issueJWT = issueJWT;
module.exports.genPassword = genPassword;
module.exports.validPassword = validPassword;
