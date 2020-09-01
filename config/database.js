const mongoose = require('mongoose');

require('dotenv').config();

const devConnection = process.env.DATABASE_URL;
//const prodConnection = process.env.DB_STRING_PROD;

//change to prodConnection when deploying
mongoose.connect(devConnection, { useNewUrlParser: true, useUnifiedTopology: true });

//Display status for debugging - remove for production
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Database'));




