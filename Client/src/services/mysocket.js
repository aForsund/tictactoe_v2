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
        this.gameNotifications = [];
        this.instances = [];
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

        this.socket.on('updateNotifications', async () => {
            let response = null;
            
            try {
              response = await API_interface.getChallenges(this.user.token, this.user.name);
              
            }
            catch (error) {
              console.log(error);
            }
            
            if (response) {
              this.notifications.splice(this.notifications.length);
              this.notifications = response.data;
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

        this.socket.on('updateGameInstance', instance => {
          //Use splice to make Vue.js update changes automatically...
          let index = this.instances.findIndex(index => index.id === instance.id);
          if (index === -1) {
            index = this.instances.length;
            this.instances.push(instance);
            this.instances.splice(index, 1, instance);

          }
          else {
            this.instances.splice(index, 1, instance);
          }
        });

        this.socket.on('gameNotification', (id, progress, notification) => {
          
          console.log('gameNotification received: ', id, progress, notification);
          let index = this.gameNotifications.findIndex(index => index.id === id);
          console.log('index', index);
          if (index === -1) {
            console.log('gameNotification - Index not found - creating new notification object for id: ', id);
            index = this.gameNotifications.length;
            this.gameNotifications.push(
              {
                id: id,
                progress: progress,
                notificationArr: []
              }
            );
          }
          console.log(this.gameNotifications[index].notificationArr);
          this.gameNotifications[index].progress = progress;
          let notificationIndex = this.gameNotifications[index].notificationArr.length;
          this.gameNotifications[index].notificationArr.push();
          this.gameNotifications[index].notificationArr.splice(notificationIndex, 1, notification);
        });

        this.socket.on('fetchInstance', async id => {
          console.log(`I'm told to fetch instance id ${id}`);
          let response = null;
          try {
            response = await API_interface.fetchInstance(this.user.token, id);
            console.log(response);
          }
          catch (err) {
            console.log(err);
          }
          if (response) {
            let index = this.instances.findIndex(index => index.id === response.data.id);
            if (index === -1) {
              index = this.instances.length;
              this.instances.push();
              this.instances.splice(index, 1, response.data.instance);
            } else {
              this.instances.splice(index, 1, response.data.instance);
            }
          }
        });
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

    acceptChallenge(challenge) {
      this.socket.emit('acceptChallenge', challenge)
    }

    joinGame(user, gameId) {
      this.socket.emit('joinGame', user, gameId);
      
    }

    confirmConnection(id) {
        this.socket.emit('confirmConnection', id);
    }

    removeNotification(name, notification) {
      this.socket.emit('removeNotification', name, notification);
    }

    makeMove(name, id, move) {
        console.log('making move...')
        console.log(this.user.username, id, move);
        this.socket.emit('makeMove', name, id, move);
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