require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

//const jwt = require('jsonwebtoken');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Database'));

//Import routes
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/game');
const userRoute = require('./routes/user');


//Route middleware
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/game', gameRoute);


app.listen(3000, () => console.log('I am alive...'));