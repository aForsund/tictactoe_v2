const express = require('express');
const passport = require('passport');
const socketio = require('socket.io');

//Remove cors for production!  <----------
//const cors = require('cors');


require('dotenv').config();

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

//Remove cors for production!!    <---------
//app.use(cors());

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes setup
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/game');
const userRoute = require('./routes/user');



//API function calls
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/game', gameRoute);

//Enable express to serve static files (Vue.js app)
app.use(express.static(__dirname + '/public/'));

//Direct all traffic to Vue.js app
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));




const server = require('http').createServer(app);


const io = socketio(server);

io.on('connection', socket => {
  require('./config/websocket')(socket, io);

});


let port = 3001 || process.env.PORT;




server.listen(port, () => console.log(`Server started on port ${port}`));


