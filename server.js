const express = require('express');
//const path = require('path');
const passport = require('passport');

require('dotenv').config();

//Create Express application
const app = express();

//Configure the DB and open a global connection
require('./config/database');

//Configure DB models
require('./models/user');
require('./models/game');

//Pass the global passport object into the configuration function
require('./config/passport')(passport);

//Initialize passport object on every request
app.use(passport.initialize());

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import routes

//const routes = require('./routes');
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/game');
const userRoute = require('./routes/user');

//Route middleware
//app.use(routes);

//API function calls
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/game', gameRoute);

//Enable express to serve static files
app.use(express.static(__dirname + '/public/'));

app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));

let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
