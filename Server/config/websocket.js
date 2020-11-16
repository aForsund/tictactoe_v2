const formatMessage = require('../lib/message');

const botName = 'Chatbot';

const users = [];

module.exports = (socket, io) => {
    
        socket.emit('hello', 'hello from socket.io');
        console.log('new WS connection...');

        socket.on('joinChat', ({ username }) => {
            console.log('user joined chat..');
            users.push({ id: socket.id, username });
    
            socket.join('chat');
    
            //Welcome current user
            socket.emit('message', formatMessage(botName, 'Welcome to the chat'));
            
            //Broadcast to other users
            socket.broadcast.to('chat').emit('message', formatMessage(botName, `${username} has joined the chat`));
    
            io.to('chat').emit('roomUsers', users)

            
        });

        socket.on('leaveChat', () => {
            let index = users.findIndex(index => index.id === socket.id);
            if (index !== -1) {
                let user = users.splice(index, 1);
                io.to('chat').emit('message', formatMessage(botName, `${user.username} has left the chat`));
            }
        });  

        socket.on('sendMessage', message => {
            console.log('message received...');
            let index = users.findIndex(index => index.id === socket.id);
            if (index !== -1) {
                console.log('message is', message);
                socket.emit('message', formatMessage('You', message));
                socket.broadcast.to('chat').emit('message', formatMessage(socket.id, message));
            } else {
                console.log('user is not part of chat...')
            }
        })
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

    };
    

    




