
const socketUtils = require('../lib/socketUtils');
const { v4: uuidv4 } = require('uuid');


const MultiplayerGame = require ('../lib/game');
const botName = 'Chatbot';

const users = [];
const chatUsers = [];
const multiplayerInstances = [];

module.exports = (socket, io) => {
        
        console.log('new WS connection...');
        
        
        socket.on('connection', ({ username }) => {
            console.log('test on connect...')
            socket.emit('hello', `hello ${username}, from socket.io`);
            users.push({ id: socket.id, username: username });
            io.emit('updateUsers', users);
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
          console.log('CHALLENGE ----------------------');
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
            
            if (challengeSent) receiptSent = await socketUtils.addNotification( challenger.username, 
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
            else handleErrors('notification', 'User already challenged...');
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
          let index = users.findIndex(index => index.id === socket.id);
          if (index !== -1) {
              console.log('message is', message);
              socket.emit('message', socketUtils.formatMessage('You', message));
              socket.broadcast.to('chat').emit('message', socketUtils.formatMessage(socket.id, message));
          } else {
              console.log('user is not part of chat...')
          }
        });
        
        socket.on('acceptChallenge', challenge => {
          console.log(`${socket.id} accepted challenge..`);
          console.log('challenge: ');
          console.log(challenge);
          let index = users.findIndex(index => challenge.challenger === index.username);
          if (index === -1) {
            handleErrors('notification', 'Challenger is not online...');
            return;
          }
          let instance = {
            id: challenge.id, 
            playerOne: {
              player: challenge.receiver,
              joined: false
            }, 
            playerTwo: {
              player: challenge.challenger,
              joined: false
            }
          }
          
          multiplayerInstances.push(instance);

          socket.emit('updateGameInstance', instance);
          socket.broadcast.to(users[index].id).emit('updateGameInstance', instance)
          

          
        });

        socket.on('joinGame', async (user, id) => {
          let index = multiplayerInstances.findIndex(index => id === index.id);
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
          socket.join(id, async () => {
            if (instance.playerOne.joined && instance.playerTwo.joined) {
              io.to(id).emit('notification', `All players have successfully joined game ${instance}`);
              io.to(id).emit('notification', 'Starting a new game instance...');
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
              console.log(instance);
              io.to(id).emit('notification', 'Game successfully initialized');
              io.to(id).emit('updateGameInstance', instance);
              //Update database... using dummy timeout for now...
              await new Promise(resolve => setTimeout(resolve, 10000));
              instance.start = true;
              io.to(id).emit('updateGameInstance', instance);
            }

            else {
              let index = users.findIndex(index => index.username === instance.playerOne.joined ? instance.playerTwo.player : instance.playerOne.player);
              let user = users[index];
              socket.broadcast.to(user.id).emit('updateGameInstance', instance);
              socket.emit('notification', `You have successfully joined game ${instance}`);
              socket.emit('notification', 'Waiting for other player...');
            }
            

            
          });
        })

        socket.on('disconnect', () => {
            let user = [null];
            let index = users.findIndex(index => index.id === socket.id);
            if (index !== -1) user = users.splice(index, 1);
            console.log(`${user[0]} disconnected`);
            io.emit('updateUsers', users);
        });

        const refreshSockets = () => {
          console.log('emitting refreshsockets');
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

        
}