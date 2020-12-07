
const socketUtils = require('../lib/socketUtils');


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
            let index = users.findIndex(index => index.id === socket.id);
            if (index === -1) {
              handleErrors('user');
              return;
            }
            let challenger = users[index];
            console.log('trying to update DB...')
            let proceed = await socketUtils.addNotification( object.username, { challenge: true, username: challenger.username } );
            if (proceed) socket.broadcast.to(object.id).emit('updateNotifications');
            else handleErrors('notification', 'User already challenged...');
        });

        socket.on('removeNotification', async (name, id) => {
           let proceed = await socketUtils.removeNotification(name, id);
           if (proceed) {
            let index = users.findIndex(index => index.username === name);
            if (index === -1) {
              handleErrors('notification', 'Error updating notifications..');
              return;
            }
            handleErrors('notification', 'Error updating notifications..');
            let user = users[index];
            console.log(users);
            console.log(user.id);
            socket.emit('updateNotifications');
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