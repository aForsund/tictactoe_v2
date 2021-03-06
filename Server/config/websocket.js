
const socketUtils = require('../lib/socketUtils');
const { v4: uuidv4 } = require('uuid');


const MultiplayerGame = require ('../lib/game');
const Timer = require('../lib/timer.js');

const botName = 'Chatbot';

//set timer variables here
const roundTimer = 20000;
const buffer = 2000;


const users = [];
const chatUsers = [];
const multiplayerInstances = [];
const timers = [];

module.exports = (socket, io) => {
        
        console.log('new WS connection...');
        let tempIndex = users.findIndex(index => index.id === socket.id);
        if (tempIndex === -1) socket.emit('sendInfo');
        
        
        
        socket.on('connection', ({ username }) => {
            socket.emit('hello', `hello ${username}, from socket.io`);
            let index = users.findIndex(index => index.username === username);
            if (index === -1) users.push({ id: socket.id, username: username });
            else users[index].id = socket.id;
            
            io.emit('updateUsers', users);
            checkActiveInstances(username);

        });

        socket.on('joinChat', ({username }) => {
            console.log('user joined chat..');
            chatUsers.push({ id: socket.id, username });
    
            socket.join('chat');
    
            //Welcome current user
            socket.emit('message', socketUtils.formatMessage(botName, 'Welcome to the chat'));
            
            //Broadcast to other users
            socket.broadcast.to('chat').emit('message', socketUtils.formatMessage(botName, `${username} has joined the chat`));
    
            io.to('chat').emit('roomUsers', users);

            
        });

        socket.on('challenge', async object => {
          
          console.log(object);
            let index = users.findIndex(index => index.id === socket.id);
            if (index === -1) {
              handleErrors('user');
              return;
            }
            let challenger = users[index];
            console.log('CHALLENGER:', challenger);
            
            console.log('trying to update DB...');
            let id = uuidv4();
            let challengeSent = await socketUtils.addNotification( object.username, 
              { 
                challenge: true, 
                challenger: challenger.username,
                receiver: object.username,
                id: id 
              } 
            );
            let receiptSent = false;
            
            if (challengeSent) receiptSent = await socketUtils.addNotification(challenger.username, 
              { 
                sentChallenge: true, 
                challenger: challenger.username,
                receiver: object.username,
                id: id 
              }
            );
            if (challengeSent && receiptSent) {
              socket.broadcast.to(object.id).emit('updateNotifications');
              socket.emit('updateNotifications');
            }
            else {
              handleErrors('notification', 'User already challenged...');
            }

        });

        socket.on('removeNotification', async (name, notification) => {
          console.log('removeNotification', notification);
          let proceed = await socketUtils.removeNotification(name, notification.id);
          
          
          if (proceed) {
            socket.emit('updateNotifications');  
            if (notification.challenge) {
              //Remove sent challenge notification from challenger
              proceed = await socketUtils.removeNotification(notification.challenger, notification.id);
              if (proceed) {
                let index = users.findIndex(index => notification.challenger === index.username);
                if (index === -1) {
                  handleErrors('notification', 'Challenger is not online..');
                  return;
                }
                let user = users[index];
                socket.broadcast.to(user.id).emit('updateNotifications');
              }
            } else if (notification.sentChallenge) {
              //Remove challenge from challenged
              proceed = await socketUtils.removeNotification(notification.receiver, notification.id);
              if (proceed) {
                let index = users.findIndex(index => notification.receiver === index.username);
                if (index === -1) {
                  handleErrors('notification', 'Receiver is not online..');
                  return;
                }
                let user = users[index];
                socket.broadcast.to(user.id).emit('updateNotifications');
              }
            }
          } else {
            handleErrors('notification', 'Error updating notifications..');
          }
        });

        socket.on('leaveChat', () => {
            let index = chatUsers.findIndex(index => index.id === socket.id);
            if (index !== -1) {
                let user = chatUsers.splice(index, 1);
                io.to('chat').emit('message', socketUtils.formatMessage(botName, `${user[0].username} has left the chat`));
            }
        });  

        socket.on('sendMessage', message => {
          console.log('message received...');
          let index = chatUsers.findIndex(index => index.id === socket.id);
          if (index !== -1) {
              console.log('message is', message);
              socket.emit('message', socketUtils.formatMessage('You', message));
              socket.broadcast.to('chat').emit('message', socketUtils.formatMessage(chatUsers[index].username, message));
          } else {
              console.log('user is not part of chat...')
          }
        });
        
        socket.on('acceptChallenge', async challenge => {

          let index = users.findIndex(index => challenge.challenger === index.username);

          if (index === -1) {
            handleErrors('notification', 'Challenger is not online...');
            return;
          }

          let gameIndex = multiplayerInstances.findIndex(index => index.id === challenge.id);

          if (gameIndex !== -1) {
            handleErrors('notification', 'game is already initialized');
            return;
          }

          //check if game is already initialized
          let success = await socketUtils.findGame(challenge.id);
          console.log('acceptChallenge DB call response:', success);

          if (success) {
            handleErrors('notification', 'game is already initialized..');
            return;
          }

          //Create new instance object          
          let instance = {
            id: challenge.id, 
            playerOne: {
              player: challenge.receiver,
              joined: false,
              timeouts: 0
            }, 
            playerTwo: {
              player: challenge.challenger,
              joined: false,
              timeouts: 0
            },
            started: false,
            completed: false,
            lastUpdate: null,
            game: null,
            progress: undefined,
            playerO_id: null,
            playerX_id: null
          }
          
          multiplayerInstances.push(instance);

          socket.emit('updateGameInstance', instance);
          
          //Broadcast update to challenger
          socket.broadcast.to(users[index].id).emit('updateGameInstance', instance);
        });

        socket.on('joinGame', async (user, id) => {
          
          //check if game is already initialized - joinGame should be avoided on client side if user has already joined the game..
          let success = await socketUtils.findGame(id);
          if (success) {
            handleErrors('notification', 'game is already started.. forcing update from DB..');
            socket.join(id, () => {
              socket.emit('fetchInstance', id);
            });
            return;
          }

          //check if game exists in instance array..
          console.log(`check if game exists in instance array, ${id}`);
          let index = multiplayerInstances.findIndex(index => {
            console.log('checking vs ', index.id);
            id === index.id
          });
          if (index === -1) {
            handleErrors('notification', 'Instance not found in instance array... forcing array update');
            await getActiveInstances();
            
            //Check one more time..
            index = multiplayerInstances.findIndex(index => id === index.id);
            if(index === -1) {
              handleErrors('notification', 'something is wrong with getActiveInstances function....')
              return;
            }
          }

          //User joins or creates a new game instance in instance array..
          let instance = multiplayerInstances[index];
          if (user === instance.playerOne.player) {
            instance.playerOne.joined = true;
            instance.playerOne.id = socket.id;
          } else if (user === instance.playerTwo.player) {
            instance.playerTwo.joined = true;
            instance.playerTwo.id = socket.id
          } else {
            handleErrors('notification', 'Something went wrong with starting mulitplayer instance...');
            return;
          }

          //User joins instance room
          socket.join(id, async () => {
            if (instance.playerOne.joined && instance.playerTwo.joined) {
              socket.emit('updateGameInstance', instance);
              instance.progress = 10;
              io.to(id).emit('gameProgress', id, instance.progress);
              io.to(id).emit('gameNotification', id, false, `All players have successfully joined instance`);
              instance.progress = 20;
              io.to(id).emit('gameProgress', id, instance.progress);
              io.to(id).emit('gameNotification', id, false, 'Creating new game object...');
              
              //Updating instance object
              let gameoptions = {
                playerOne: {
                  cpu: false,
                  difficulty: 0,
                  turn: true,
                  mark: 'X'
                },
                playerTwo: {
                  cpu: false,
                  difficulty: 0,
                  turn: false,
                  mark: 'O'
                }
              }
              let game = new MultiplayerGame(gameoptions);
              instance.game = game;
              instance.progress = 30;
              io.to(id).emit('gameProgress', id, instance.progress);
              io.to(id).emit('gameNotification', id, true, 'Creating new game object... DONE');
              io.to(id).emit('gameNotification', id, false, 'Updating DB...');
              
              instance.progress = 70;
              instance.started = true;

              let success = await socketUtils.startNewGame(instance);
              if (success) {
                

                io.to(id).emit('gameProgress', id, instance.progress);
                io.to(id).emit('gameNotification', id, true, 'Updating DB... DONE');
                io.to(id).emit('gameNotification', id, false, 'Removing Notification...');
                await socketUtils.removeNotification(instance.playerOne.player, id);
                await socketUtils.removeNotification(instance.playerTwo.player, id);
                instance.progress = 100;
                io.to(id).emit('gameNotification', id, true, 'Removing Notification... DONE');
                io.to(id).emit('updateNotifications');
                io.to(id).emit('gameProgress', id, instance.progress);
                await new Promise(resolve => setTimeout(resolve, 2000));
                io.to(id).emit('gameCountdown', id, 5000);
                await new Promise(resolve => setTimeout(resolve, 5000));
                io.to(id).emit('fetchInstance', id);
                //socket below not working on current Azure hosting - implemented fix on client side
                //io.to(id).emit('gameCountdown', id, roundTimer);
                watchGame(instance);
              }
              else {
                handleErrors('notification', 'Error starting game...');
              }
            }

            else {
              let index = users.findIndex(index => index.username === instance.playerOne.joined ? instance.playerTwo.player : instance.playerOne.player);
              let user = users[index];
              socket.emit('updateGameInstance', instance);
              socket.broadcast.to(user.id).emit('updateGameInstance', instance);
              socket.emit('gameNotification', id, null, `You have successfully joined game instance:${id}`);
              socket.emit('gameNotification', id, null, 'Waiting for other player...');
            }
            

            
          });
        })

        socket.on('makeMove', async (user, id, move) => {
          console.log('makeMove', user, id, move);
          let moveCommited = false;
          let field = null;
          let index = multiplayerInstances.findIndex(index => id === index.id);
          if (index === -1) {
            console.log('instance not found...');
            await getActiveInstances();
            index = multiplayerInstances.findIndex(index => id === index.id);
            if(index === -1) {
              console.log('something is wrong with getActiveInstances function....')
              console.log(multiplayerInstances);
              console.log(id);
              return;
            }
          }
          let instance = multiplayerInstances[index];
          io.to(id).emit('notification', multiplayerInstances);
          if (!instance.started) {
            handleErrors('notification', 'game has not started yet');
            return;
          }
          if (instance.game.status.isEnded) {
            decideOutcome(instance);
            return;
          }
          if (user === instance.playerOne.player && instance.game.playerOne.turn) {
            //user is player one and player one has next turn...
            [moveCommited, field] = instance.game.confirmInput(move);
          }
          else if (user === instance.playerTwo.player && instance.game.playerTwo.turn) {
            //user is player two and player two has next turn...
            [moveCommited, field] = instance.game.confirmInput(move);
          }
          if (moveCommited) {
            cancelWatcher(instance);
            //io.to(id).emit('gameStopCountdown', id);
            io.to(id).emit('gameNotification', id, false, `${user} selected ${move}`);
            io.to(id).emit('gameNotification', id, false, 'updating DB...');
            
            let success = await socketUtils.updateGame(instance);
            
            if (success) {
              io.to(id).emit('gameNotification', id, true, 'updating DB... DONE');
              io.to(id).emit('fetchInstance', id);
              
            } else {
              handleErrors('notification', 'error updating DB...');
              return;
            }

            if (instance.game.status.isEnded) {
              decideOutcome(instance);
            } else {
              //io.to(id).emit('gameCountdown', id, roundTimer);  
              watchGame(instance);
            }
          }
        });
           
        socket.on('disconnect', () => {
          console.log('user disconnected')
            let user = [null];
            let index = users.findIndex(index => index.id === socket.id);
            if (index !== -1) {
              user = users.splice(index, 1);
              
              io.emit('updateUsers', users);
              handleDisconnect(user[0]);
            }
            console.log(`${user[0]} disconnected`);
        });

        const refreshSockets = () => {
          io.emit('refreshSockets');
        };

        const handleErrors = (error, payload) => {
          switch (error) {
            case 'user':
              //Handle user not found error in case of server restart
              if (users.length === 0) {
                refreshSockets();
              }
              else {
                users = [];
                refreshSockets();
              }
              break;
            case 'notification':
              socket.emit('notification', payload);
              break;
            default:
              console.log('No error to handle..')
          }
        }

        const deleteInstance = id => {
          let index = multiplayerInstances.findIndex(index => index.id === id)
          if (index === -1) {
            io.to(id).emit('notification', 'Error deleting instance...');
            return;
          }
          multiplayerInstances.splice(index, 1);
          io.to(id).emit('deleteInstance', id);
        }

        //Remove user from all active instances user was part of..
        const handleDisconnect = user => {
          
          let activeInstances = multiplayerInstances.filter(entry => entry.playerOne.player === user.username || entry.playerTwo.player === user.username);
          
          //Loop through all active instances and update...
          for (let i = 0; i < activeInstances.length; i++) {
            io.to(activeInstances[i].id).emit('gameNotification', activeInstances[i].id, null, `${user.username} has disconnected..` );
          }  
          
        }

        //Send details of all games user is part of upon connection
        const checkActiveInstances = username => {
        
          let activeInstances = multiplayerInstances.filter(entry => entry.playerOne.player === username || entry.playerTwo.player === username);
          
          //Loop through all active instances and update...
          for (let i = 0; i < activeInstances.length; i++) {
            socket.join(activeInstances[i].id);
            socket.emit('fetchInstance', activeInstances[i].id);
            io.to(activeInstances[i].id).emit('gameNotification', activeInstances[i].id, activeInstances[i].progress, `${username} has joined..` );
          }
        }  

        //Create a new timer for each turn and watch for timeout - call decideOutcome function on timeout
        const watchGame = async (instance) => {
          
          let index = timers.findIndex(index => index.id === instance.id);
          if (index !== -1) {
            //Timer exists already - cancel the timer
            io.to(instance.id).emit('notification', 'cancelling existing timer upon creating a new...');
            timers[index].cancel();
            //Then remove the timer
            timers.splice(index, 1)
          }

          io.to(instance.id).emit('notification', 'creating new timer...');

          let timer = new Timer(instance.id, roundTimer + buffer);
          
          
          //Store the timer object in array for later access if input is provided before timer depletes.
          timers.push(timer);
          
          //Await timer depletion
          await timer.promise;
          console.log(`timer ended with timeout = ${timer.timeout}`);
          console.log(timer);
          //End game if timer was depleted
          if (timer.timeout) {
            decideOutcome(instance, true);
          }
        }

        //Cancel timer started in watchGame function on player input
        const cancelWatcher = instance => {
          let index = timers.findIndex(index => index.id === instance.id);
          if (index !== -1) {
            io.to(instance.id).emit('notification', 'cancelling timer...');
            //Timer exists already - cancel the timer
            timers[index].cancel();
            //Then remove the timer from timers array
            timers.splice(index, 1)
          }
        }

        //Evaluate outcome of game object and call further actions
        const decideOutcome = async (instance, timeout = false) => {
          instance.completed = true;
          cancelWatcher(instance);
          let success = await socketUtils.updateGame(instance);
          if (success) io.to(instance.id).emit('fetchInstance', instance.id);
          else {
            io.to(instance.id).emit('notification', 'Something went wrong with updating DB on decideOutcome function...');
            return;
          }
          // 1 -Calculate win or draw
          
          if (timeout) {
            
            io.to(instance.id).emit('notification', 'end game on timeout...');
            if (instance.game.currentPlayer.mark === 'X') {
              let playerRatings = calculateElo(instance.playerX_rating, instance.playerO_rating, false, false);
              await socketUtils.updateUser(instance.playerX_id, 'L', instance.id, playerRatings[0]);
              await socketUtils.updateUser(instance.playerO_id, 'W', instance.id, playerRatings[1]);
            } else {
              let playerRatings = calculateElo(instance.playerX_rating, instance.playerO_rating, true, false);
              await socketUtils.updateUser(instance.playerX_id, 'W', instance.id, playerRatings[0]);
              await socketUtils.updateUser(instance.playerO_id, 'L', instance.id, playerRatings[1]);
            }
            deleteInstance(instance.id);
          }
          
          else if (instance.game.status.draw) {
            io.to(instance.id).emit('notification', 'end game on draw...');
            let playerRatings = calculateElo(instance.playerX_rating, instance.playerO_rating, false, instance.game.status.turnCount);
            await socketUtils.updateUser(instance.playerX_id, 'D', instance.id, playerRatings[0]);
            await socketUtils.updateUser(instance.playerO_id, 'D', instance.id, playerRatings[1]);
            deleteInstance(instance.id);
          }
          
          else {
            if (instance.game.playerOne.turn) {
              let playerRatings = calculateElo(instance.playerX_rating, instance.playerO_rating, true, false);
              await socketUtils.updateUser(instance.playerX_id, 'W', instance.id, playerRatings[0]);
              await socketUtils.updateUser(instance.playerO_id, 'L', instance.id, playerRatings[1]);
            } else {
              let playerRatings = calculateElo(instance.playerX_rating, instance.playerO_rating, false, false);
              await socketUtils.updateUser(instance.playerX_id, 'L', instance.id, playerRatings[0]);
              await socketUtils.updateUser(instance.playerO_id, 'W', instance.id, playerRatings[1]);
            }
            deleteInstance(instance.id);
          }
          io.to(instance.id).emit('updateUser');
          io.to(instance.id).emit('fetchInstance', instance.id);
        }

        const getActiveInstances = async () => {
          console.log('getActiveInstances.....')
          let activeGames = await socketUtils.getActiveGames();
          

          let insertArray = activeGames.filter(entry => {
            return !multiplayerInstances.some(i => i.id === entry.id)
          });

          //loop through insertArray and start each individual game instance...
          for (let i = 0; i < insertArray.length; i++) {
            console.log(`starting game ${insertArray[i].id}`);
            startGame(insertArray[i]);
            watchGame(insertArray[i]);
          }
          

          insertArray.forEach(entry => startGame(entry));
          multiplayerInstances.push(...insertArray);

          return true;


        }

        //Function to boot new game as instances fetched from DB are converted to JSON objects 
        const startGame = (instance) => {
            
          //get required parameters
          let gameParameters = {
            playerOne: instance.game.playerOne,
            playerTwo: instance.game.playerTwo,
            board: instance.game.board,
            turnCount: instance.game.status.turnCount
          }       
          
          //start new game with obtained parameters
          instance.game = new MultiplayerGame(gameParameters);
          
        }


        const calculateElo = (X_rating, O_rating, X_winner, draw = false) => {
          //Define score total per game
          let pointsPerGame = 16;
          //Set variables for calculations
          let bracket = null;
          let playerX_rating = null;
          let playerO_rating = null;
          let drawFactor = null;
          let pointSpread = Math.abs(X_rating - O_rating);
          //Get bracket for calculating score for win or loss
          if (pointSpread > 400) bracket = 0;
          else if (pointSpread > 350) bracket = 1;
          else if (pointSpread > 300) bracket = 2;
          else if (pointSpread > 250) bracket = 3;
          else if (pointSpread > 200) bracket = 4;
          else if (pointSpread > 150) bracket = 5;
          else if (pointSpread > 100) bracket = 6;
          else if (pointSpread > 50) bracket = 7;
          else bracket = 8;

          if (draw) {
            //Set score total according to round count
            switch (draw) {
            case 5:
            case 6:
              drawFactor = 0.5;
              break;
            case 7:
              drawFactor = 0.25;
              break;
            default:
              drawFactor = 0;
            }
            playerO_rating = Math.ceil(O_rating > X_rating ? (bracket * drawFactor) : (pointsPerGame - bracket) * drawFactor);
            playerX_rating = -Math.abs(playerO_rating);
          }
          else if (X_winner) {
            playerX_rating = X_rating > O_rating ? bracket : (pointsPerGame - bracket);
            playerO_rating = -Math.abs(playerX_rating);
          }
          else {
            playerO_rating = O_rating > X_rating ? bracket : (pointsPerGame - bracket);
            playerX_rating = -Math.abs(playerO_rating);
          }
          return [playerX_rating, playerO_rating]
        }

}