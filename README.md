# tictactoe

This project is a demo of a tic tac toe implementation with singleplayer and multiplayer options.

See live demo of latest version [here](http://tictactoev2.azurewebsites.net/)

See live demo of second version [here](https://shrouded-waters-13601.herokuapp.com/).

See live demo of first version [here](https://cryptic-sea-66034.herokuapp.com) and repository [here](https://github.com/aForsund/tictactoe).

### Front end

- Vue.js and Vuex
- JavaScript game logic
- axios
- Bulma CSS framework
- socket.io

### Back end

- Node.js + Express
- Express passport and JWT
- mongoDB
- socket.io

### About

The singleplayer implementation includes a selectable computer difficulty level which is based on the following logic:

- Level 0 - Computer makes a random choice
- Level 1 - Computer checks if it can win on the next move or lose on the following move, and makes a choice based on that. If not it will make a random choice
- Level 2 - Computer uses minimax algorithm to make the best choice, but with limited depth
- Level 3 - Computer uses minimax algorithm to make the best choice, but with unlimited depth

There is also a function to analyse the board and make an early decision if the game is a draw. This function uses a custom designed node tree data structure. As the Tic Tac Toe game ends in a draw if both players play perfectly, the functionality of calling a draw early adds more depth and option to score more points if, for instance the player not starting is able to draw the game before the 8th turn.

The multiplayer implementation uses socket.io to communicate events between server and clients. Clients are told to fetch data from API-interface as required. Game instances are calculated server side with logic from the singleplayer implementation, including board draw analyser. Multiplayer instances are saved to DB as a json object for each update, and then again fetched by corresponding clients.

ELO is calculated in the following way:

| Point Spread | Win | Lose |
| ------------ | --- | ---- |
| 0-50         | 8   | 8    |
| 51-100       | 7   | 9    |
| 101-150      | 6   | 10   |
| 151-200      | 5   | 11   |
| 201-250      | 4   | 12   |
| 251-300      | 3   | 13   |
| 301-350      | 2   | 14   |
| 351-400      | 1   | 15   |
| 400+         | 0   | 16   |

If a game is a tie before the 8th round, the non-starting player receives increased ELO of 25% or 50% of a corresponding win, depending on round count. All ELO distributions are zero zum - sum of points added or deducted are always zero.

### Project updates

Update 04/01/2021

- Added multiplayer functionality for client and server
- Further improved client and server implementation
- Added ranking system with ELO calculation algorithm

Update 10/12/2020

- Socket.io implemented on server and client with mongoDB and API integration. Working infrastructure in place for chat room and multiplayer instances.
- Notifications are stored on MongoDB cloud server.
- Status text updating while client CPU is processing next move.
- A few bugs fixed in local game implementation.
- Dashboard view receives notifications and multiplayer game instances dynamically. Player can choose game instance to display.

Update 16/11/2020

- Login and register module implemented
- socket.io implemented on server and client with selectable chat functionality
- Vue.js implementation is more advanced and has most of the functionality in place
- Node.js server checks for token date validity

### Remaining work

- Test deployed functionality and stability
- Scale Docker deployment as required
- Further fail safe implementation and bug fixes as required
- Further expand functionality such as private messages, player leaderboards and advanced dashboard options (online game history ect...)
