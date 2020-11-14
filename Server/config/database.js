const mongoose = require('mongoose');

require('dotenv').config();

const prodConnection = process.env.DATABASE_URI;
const devConnection = prodConnection;

console.log(prodConnection);

console.log('Trying to connect to database..');

if (process.env.NODE_ENV === 'production') {
	console.log('in production... ');
	mongoose.connect(prodConnection, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	mongoose.connection.on('connected', () => {
		console.log('Database connected');
	});
} else {
	console.log('devconnection....');
	mongoose.connect(devConnection, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	mongoose.connection.on('connected', () => {
		console.log('Database connected');
	});
}
