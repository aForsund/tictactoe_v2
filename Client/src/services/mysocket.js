import io from 'socket.io-client';

//Change url for production
const SERVER_URL = '';

export default class MySocket {
    constructor(user) {
        this.user = user;
        this.socket = io(SERVER_URL);
        this.chat = [];
        this.initSocket();
    }
    initSocket() {
        //Confirm connection
        this.socket.on('connect', () => {
            console.log('socket.io connected');
            console.log('socket id: ', this.socket.id);
        });

        //Add messages to chat array - use splice to make Vue.js update changes automatically
        this.socket.on('message', message => {
            
            let index = this.chat.length;
            this.chat.push('');
            this.chat.splice(index, 1, message);

        })



    }

    joinChat() {
        console.log('joinchat function');
        console.log(this.user);
        this.socket.emit('joinChat', { username: this.user.name });
    }

    leaveChat() {
        this.socket.emit('leaveChat');
    }
    sendMessage(message) {
        this.socket.emit('sendMessage', message);
    }
}