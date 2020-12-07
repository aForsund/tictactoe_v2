import io from 'socket.io-client';
import API_interface from "@/services/API-interface.js";

//Change url for production
const SERVER_URL = 'http://localhost:3000';

export default class MySocket {
    constructor(user) {
        this.user = user;
        this.socket = io(SERVER_URL);
        this.chat = [];
        this.users = [];
        this.notifications = [];
        
        this.activeMultiplayerGame = false;
        this.initSocket();
        this.connect();
        
    }
    initSocket() {

        //Confirm connection
        this.socket.on('connect', async () => {
            let response = await API_interface.getChallenges(this.user.token, this.user.name);
            this.notifications = response.data;
            console.log('socket.io connected');
            console.log('socket id: ', this.socket.id);
        });

        //Add messages to chat array - use splice to make Vue.js update changes automatically
        this.socket.on('message', message => {
            
            let index = this.chat.length;
            this.chat.push('');
            this.chat.splice(index, 1, message);

        })

        this.socket.on('multiplayerGame', ({ gameData }) => {
            console.log(gameData);
        });

        this.socket.on('updateNotifications', async () => {
            let response = null;
            
            try {
              response = await API_interface.getChallenges(this.user.token, this.user.name);
              
            }
            catch (error) {
              console.log(error);
            }
            
            if (response) {
              this.notifications.slice(this.notifications.length);
              this.notifications = response.data;
              console.log('notifications: ')
              console.log(this.notifications);
            }
        });

        this.socket.on('updateBoard', ({ gameData }) => {
            console.log(gameData);
        });

        this.socket.on('updateUsers', users => {
            this.users = users;
        });

        this.socket.on('hello', message => console.log(message));

        this.socket.on('refreshSockets', () => this.connect());

        this.socket.on('notification', (payload) => console.log(payload));

    }

    connect() {
        this.socket.emit('connection', { username: this.user.name });
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

    challenge(user) {
        this.socket.emit('challenge', user);
    }

    confirmConnection(id) {
        this.socket.emit('confirmConnection', id);
    }

    removeNotification(name, id) {
      this.socket.emit('removeNotification', name, id);
    }

    selectField(field) {
        this.socket.emit('selectField', field);
    }

    playAgain() {
        this.socket.emit('playAgain');
    }
    
    acceptRematch() {
        this.socket.emit('acceptRematch');
    }

    declineRematch() {
        this.socket.emit('declineRematch');
    }

    leaveGame() {
        this.socket.emit('leaveGame');
    }
    logOut() {
        this.socket.close();
        //this.socket.close();
    }
}