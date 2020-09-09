const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

console.log('hello from database.js');
const connectDB = async () => {
	try {
		console.log('trying to connect to db...');
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('mongoDB connected...');
	} catch (err) {
		console.log(err.message);
		//Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
