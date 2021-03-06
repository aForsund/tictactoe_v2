import io from 'socket.io-client';
import API_interface from "@/services/API-interface.js";
//import DataStorage from '@/services/dataStorage.js';

//Change url for production
const SERVER_URL = '';

export default class MySocket {
  constructor(user) {
    //this.storage = new DataStorage();
    this.user = user;
    this.details = user.details;
    this.socket = io(SERVER_URL);
    this.chat = [];
    this.users = [];
    this.notifications = [];
    this.collectionIndex = [];
    this.collection = {};
    this.timers = {};
    this.timersActive = false;
    this.updateTimer = null;
    this.countdownCollection = {};
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
        let tempArray = users;
        let index = tempArray.findIndex(index => index.username === this.user.name);
        if (index !== -1) tempArray.splice(index, 1);
        this.users = tempArray;
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
          if (response.data) {
            console.log('adding: ', response.data);
            this.updateGame(response.data);

            //code to fix timer updates due to issues with sockets not coming through on Azure hosting
            //roundTimer is set to 20000ms on server
            if (response.data.completed) this.deleteTimer(response.data.id);
            else if (response.data.started) this.updateCountdown(response.data.id, 20000);
          }
        });

        this.socket.on('gameProgress', (id, progress) => {
         this.updateProgress(id, progress);
        });

        this.socket.on('gameCountdown', (id, time) => {
          //Only used to start initial countdown before started = true
          console.log(`I'm told to start countdown...`);
          this.updateCountdown(id, time);
        });

        //This is no longer in use - timers are stopped when completed = true
        this.socket.on('gameStopCountdown', id => {
          console.log(`I'm told to stop countdown...`);
          this.stopTimer(id);
        });

        this.socket.on('updateUser', () => {
          this.updateUser();
        })
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
      console.log('joining game... ', user, gameId);
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

    logOut() {
      this.socket.close();
    }

  //Delete game from collection
  deleteGame(id) {
    let i = this.collectionIndex.findIndex(index => index === id);
    if (i !== -1) {
      this.collectionIndex.splice(i, 1);
      delete this.collection[id];
      delete this.timers[id];
    }
  }
  //Update game object in collection
  updateGame(game) {
    //Create game object index if it does not exist
    if (!this.collectionIndex.includes(game.id)) this.collectionIndex.push(game.id);
    this.collection[game.id] = Object.assign({}, this.collection[game.id], game);
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
  updateCountdown(id, time) {
    //set interval
    let interval = 1000;

    //Create new timers object if does not exist
    if (!this.timers[id]) {
      console.log(`timers.${id} does not exist.. creating now...`);
      this.timers[id] = {};
    } 
    //Or stop timer if already active..
    else {
      this.stopTimer(id);
    }
    //this.timers[id] = Object.assign({}, this.timers[id] ? this.timers[id] : {});
    
    console.log('creating new countdown in updateCountdown', time);
    
    //create temporary object to update countdownCollection
    if (!this.countdownCollection[id]) this.countdownCollection[id] = {};
    this.countdownCollection[id].value = time;
    this.countdownCollection[id].startValue = time;
    this.updateTimers();
    this.timers[id].interval = setInterval(() => {
      this.countdownCollection[id].value = this.countdownCollection[id].value - interval;
      console.log('inside interval', id, this.countdownCollection[id].value);
      if (this.countdownCollection[id].value <= 0 || !this.countdownCollection[id].value) {
        this.stopTimer(id);
      }
    }, interval);
    
  }
  stopTimer(id) {
    console.log('stop timer', id);
    if (this.timers[id]) {
      if (this.timers[id].interval) clearInterval(this.timers[id].interval);
      this.timers[id].interval = null;
      this.countdownCollection[id].value = null;
    }
  }

  deleteTimer(id) {
    if (this.timers[id]) {
      this.stopTimer(id);
      delete this.timers[id];
    }
    if (Object.keys(this.timers).length === 0) {
      clearInterval(this.updateTimer);
      this.timersActive = false;
    }
  }

  updateTimers() {
    if (this.timersActive) return;
    else {
      this.timersActive = true;
      let interval = 1000;
      console.log('starting timers update...')
      this.updateTimer = setInterval(() => {
        console.log('inside updateTimers function...');
        this.countdownCollection = Object.assign({}, this.countdownCollection);
      }, interval);
    }
  }

  forceUpdate(id) {
    console.log(id);
    //let temp = {...this.collection[id]} 
    this.collection = Object.assign({}, this.collection);
    //let temp = {...this.collection[id]};
    //this.collection[id] = {...temp};
  }
  async updateUser() {
    let details = await API_interface.getUser(this.user.id);
    this.user.details.gamesPlayed = details.data.gamesPlayed;
    this.user.details.lastOutcomes = details.data.lastOutcomes.join('');
    this.user.details.rating = details.data.rating;
    //Force Vue.js update..
    this.user = Object.assign({}, this.user); 
  }
}