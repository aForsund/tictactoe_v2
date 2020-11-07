const express = require('express');
const http = require('http');
//const path = require('path');
const passport = require('passport');
const socketio = require('socket.io');

//Remove cors for production!
const cors = require('cors');

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

//Remove cors for production!!
app.use(cors());

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


const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  socket.emit('hello', 'hello from socket.io');
  console.log('new WS connection...');
});

let port = 3000 || process.env.PORT;



server.listen(port, () => console.log(`Server started on port ${port}`));


//
// io.sockets.on('connection', (socket) => {
//   console.log('user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });