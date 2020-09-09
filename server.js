const express = require('express');
const path = require('path');
const passport = require('passport');
//const connectDB = require('./config/database');

require('dotenv').config();

//Create Express application
const app = express();

//Configure the DB and open a global connection
//connectDB();

//Configure DB models
require('./models/user');
require('./models/game');

//Pass the global passport object into the configuration function
require('./config/passport')(passport);

//Initialize passport object on every request
app.use(passport.initialize());

// *** Explain this ***

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Enable express to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//Import routes
const routes = require('./routes');
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/game');
const userRoute = require('./routes/user');

//Route middleware
app.use(routes);

//API function calls
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/game', gameRoute);

app.get('/.*/', (req, res) =>
	res.sendFile(__dirname + '/public/'));
);

const PORT = process.env.PORT || 5000;

app.listen(5000, () => console.log(`Server started on port ${PORT}`));
