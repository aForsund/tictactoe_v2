# tictactoe

This project is in development.

See live demo of this version [here](https://shrouded-waters-13601.herokuapp.com/). Note this demo does not reflec latest progress. New demo will be deployed soon.

See live demo of first version [here](https://cryptic-sea-66034.herokuapp.com) and repository [here](https://github.com/aForsund/tictactoe).

Tic Tac Toe demo with computer vs computer mode.

This app is built with vue.js and styled with Bulma CSS framework. App is served by express with API interface and mongoDB.

The current implementation includes a selectable computer difficulty level which is based on the following logic:

- Level 0 - Computer makes a random choice
- Level 1 - Computer checks if it can win on the next move or lose on the following move, and makes a choice based on that. If not it will make a random choice
- Level 2 - Computer uses minimax algorithm to make the best choice, but with limited depth
- Level 3 - Computer uses minimax algorithm to make the best choice, but with unlimited depth

There is also a function to analyse the board and make an early decision if the game is a draw. This function uses a custom designed node tree data structure. As the Tic Tac Toe game ends in a draw if both players play perfectly, the functionality of calling a draw early adds more depth and option to score more points if, for instance the player not starting is able to draw the game before the 8th turn.

Update 16/11/2020

- Login and register module implemented
- socket.io implemented on server and client with selectable chat functionality
- Vue.js implementation is more advanced and has most of the functionality in place
- Node.js server checks for token date validity

Update 10/12/2020

- Socket.io implemented on server and client with mongoDB and API integration. Working infrastructure in place for chat room and multiplayer instances.
- Notifications are stored on MongoDB cloud server.
- Status text updating while client CPU is processing next move.
- A few bugs fixed in local game implementation.
- Dashboard view receives notifications and multiplayer game instances dynamically. Player can choose game instance to display.

Remaining work before completion of project:

- Expand API and mongoDB implementation to store multiplayer games instances and played games in addition to
- Ranking system
- Further implement functionality in Vue.js
- Additional fail safe implementation required on parts of the code
- Bug fixes

### Front end

- Vue.js and Vuex
- JavaScript game logic
- axios
- Bulma CSS framework

### Back end

- Node.js + Express
- Express passport and JWT
- mongoDB
