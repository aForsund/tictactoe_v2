const formatMessage = require('../lib/message');

const botName = 'Chatbot';

const users = [];

module.exports = (socket, io) => {
    socket.on('joinChat', ({ username }) => {
                
        users.push({ id: socket.id, username });

        socket.join('chat');

        //Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to the chat'));
        
        //Broadcast to other users
        socket.broadcast.to('chat').emit('message', formatMessage(botName, `${username} has joined the chat`));

        io.to('chat').emit('roomUsers', users)
    });

}    
