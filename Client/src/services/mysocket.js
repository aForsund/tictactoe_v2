import io from 'socket.io-client';
import API_interface from "@/services/API-interface.js";
//import DataStorage from '@/services/dataStorage.js';

//Change url for production
const SERVER_URL = 'http://localhost:3000';

export default class MySocket {
  constructor(user) {
    //this.storage = new DataStorage();
    this.user = user;
    this.socket = io(SERVER_URL);
    this.chat = [];
    this.users = [];
    this.notifications = [];
    this.collectionIndex = [];
    this.collection = {};
    this.initSocket();
    this.connect();
    }
    initSocket() {

      this.socket.on('hello', payload => {
        console.log(payload);
      });

      //Confirm connection
      this.socket.on('connect', async () => {
        let response = await API_interface.getChallenges(this.user.token, this.user.name);
        this.notifications = response.data;
      });

      this.socket.on('sendInfo', () => {
        this.connect();
      });

      //Add messages to chat array - use splice to make Vue.js update changes automatically
      this.socket.on('message', message => {
        let index = this.chat.length;
        this.chat.push('');
        this.chat.splice(index, 1, message);
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
            //replace the whole notifications array with response.data
            this.notifications.splice(0, this.notifications.length, ...response.data);
          }
      });

      this.socket.on('updateUsers', async users => {
        this.users = users;
      });

      this.socket.on('refreshSockets', () => this.connect());
  
      //Add functionality for pop up notifications later...
      this.socket.on('notification', payload => console.log(payload));

      //Update instances array with splice to make Vue.js update changes automatically...
      this.socket.on('updateGameInstance', instance => {
        this.updateGame(instance);
      });

      //Add game notifications to gameNotifications array - overwrite true overwrites last entry
      this.socket.on('gameNotification', (id, overwrite, notification) => {
        this.addNotification(id, overwrite, notification);
      });

        //Fetch instance from DB and update instance array with splice
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
            console.log('adding: ', response.data);
            this.updateGame(response.data);
          }
        });

        this.socket.on('gameProgress', (id, progress) => {
         this.updateProgress(id, progress);
        });

        this.socket.on('gameCountdown', (id, time) => {
          this.updateCountdown(id, time);
        });

        this.socket.on('gameStopCountdown', id => {
          this.updateCountdown(id);
        });
    }

    connect() {
        this.socket.emit('connection', { username: this.user.name });
    }

    joinChat() {
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
    }

    //Collection methods
  /*
    //Add a new game to collection
  
  addGame(game) {
    this.collectionIndex.push(game.id);
    this.collection[game.id] = game;
    this.forceUpdate(game.id);
    
  }
  */
  //Delete game from collection
  deleteGame(id) {
    let i = this.index.findIndex(index => index === id);
    this.index.splice(i, 1);
    delete this.collection[id];
  }
  //Update game object in collection
  updateGame(game) {
    //Create game object if it does not exist
    

    //More updates to collection to be added as required in client implementation...
    //this.collection[game.id] = (Object.assign({}), game)
    if (!this.collectionIndex.includes(game.id)) this.collectionIndex.push(game.id);
    this.collection[game.id] = Object.assign({}, this.collection[game.id], game);
    //this.forceUpdate(game.id);
    //this.collection[game.id] = Object.assign({}, this.collection[game.id], game);
    //if (!this.collection[game.id].started && game.started) Vue.set(this.collection, [game.id].started, game.started);
    //if (game.completed) Vue.set(this.collection, [game.id].completed, game.completed);
    //if (game.game) Vue.set(this.collection, [game.id].game, JSON.parse(JSON.stringify(game.game)));
  }
  //Update progress indicator in collection
  updateProgress(id, progress) {
    //Vue.set(this.collection, [id].progress, progress);
    this.collection[id].progress = progress; 
    this.forceUpdate(id);
  }
  //Add notification to collection
  addNotification(id, overwrite, notification) {
    let empty = false;
    if (!this.collection[id]) {
      this.collection[id] = {};
      this.collection[id].notifications = [];
      empty = true;
    }
    if(!this.collection[id].notifications) {
      this.collection[id].notifications = [];
      empty = true;
    }
    let index = this.collection[id].notifications.length;
    if (overwrite && !empty) {
      this.collection[id].notifications.splice(index - 1, 1, notification);
    }
    else {
      this.collection[id].notifications.push();
      this.collection[id].notifications.splice(index, 1, notification);
    }
    this.forceUpdate(id);
  }
  //Update countdown indicator in collection
  updateCountdown(id, time = undefined) {
    this.collection[id].countdown = time;
    this.forceUpdate(id);
  }
  forceUpdate(id) {
    console.log(id);
    //let temp = {...this.collection[id]} 
    this.collection = Object.assign({}, this.collection);
    //let temp = {...this.collection[id]};
    //this.collection[id] = {...temp};
  }

}