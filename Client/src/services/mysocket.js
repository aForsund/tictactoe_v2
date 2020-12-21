import io from 'socket.io-client';
import API_interface from "@/services/API-interface.js";
import Vue from 'vue';
import DataStorage from '@/services/dataStorage.js';

//Change url for production
const SERVER_URL = 'http://localhost:3000';

export default class MySocket {
    constructor(user) {
        this.storage = new DataStorage();
        this.user = user;

        this.socket = io(SERVER_URL);
        this.chat = [];
        this.users = [];
        this.notifications = [];
        this.gameNotifications = [];
        this.instances = [];

        //splice promises for splice worker methods
        //this.instancePromise = null;
        //this.notificationsPromise = null;

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
              this.notifications.splice(0, this.notifications.length, ...response.data);
              //this.notifications = response.data;
            }
        });

       

        this.socket.on('updateUsers', async users => {
            this.users = users;
        });

        this.socket.on('hello', message => console.log(message));

        this.socket.on('refreshSockets', () => this.connect());

        //Console.log payload - add functionality for pop up notifications later...
        this.socket.on('notification', payload => console.log(payload));

        //Update instances array with splice to make Vue.js update changes automatically...
        this.socket.on('updateGameInstance', async instance => {
          console.log(' *** *** UPDATE GAME INSTANCE ****')
          console.log('*INSTANCE*');
          console.log(instance);
          console.log('*THIS.INSTANCES*');
          console.log(this.instances);
          let index = this.instances.findIndex(index => {
            index.id === instance.id
          });
          if (index === -1) {
            index = this.instances.length;
            this.instances.push(instance);
          }
          Vue.set(this.instances, index, instance);
          //this.spliceInstance(index, instance);
        });

        //Add game notifications to gameNotifications array - overwrite true overwrites last entry
        this.socket.on('gameNotification', async (id, overwrite, notification) => {
          let index = null;
          console.log('gameNotification received: ', id, overwrite, notification);
          console.log(this.gameNotifications);
          if (this.gameNotifications.length === 0) index = -1;
          else {
            
            index = this.gameNotifications.findIndex(async index => {
              while (!index.id) {
                await new Promise(resolve => setTimeout(resolve, 0));
                console.log('waiting in findIndex function...');
              }
              index.id === id
            });
          }
          console.log('index', index);
          if (index === -1) {
            console.log('gameNotification - Index not found - creating new notification object for id: ', id);
            index = this.gameNotifications.length;
            this.gameNotifications.push(
              {
                id: id,
                progress: undefined,
                countdown: 0,
                notificationArr: []
              }
            );
          }
          console.log(this.gameNotifications[index].notificationArr);
          
          let notificationIndex = this.gameNotifications[index].notificationArr.length;
          if (overwrite) this.gameNotifications[index].notificationArr.splice(notificationIndex -1, 1, notification);
          else {
            this.gameNotifications[index].notificationArr.push();
            this.gameNotifications[index].notificationArr.splice(notificationIndex, 1, notification);
          }
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
            console.log(this.instances);
            let index = null;
            if (this.instances.length === 0) index = -1;
            
            else {
              
              index = this.instances.findIndex(index => {
                
                index.id === response.data.id;
              });
            }
            if (index === -1) {
              index = this.instances.length;
              this.instances.push();
            }
            //this.instances.splice(index, 1, response.data);
            //this.spliceInstance(index, response.data);
            Vue.set(this.instances, index, response.data);
          }
        });

        this.socket.on('gameProgress', async (id, progress) => {
          let index = null;
          if (this.gameNotifications.length === 0) index = -1;
          else {
            
            index = this.gameNotifications.findIndex(async index => {
              while (!index.id) {
                await new Promise(resolve => setTimeout(resolve, 0));
                console.log('waiting in findIndex function...');
              }
              index.id === id;
            });
          }
          if (index === -1) {
            console.log('gameProgress - Index not found - creating new notification object for id: ', id);
            index = this.gameNotifications.length;
            this.gameNotifications.push(
              {
                id: id,
                progress: undefined,
                countdown: 0,
                notificationArr: []
              }
            );
          }
          
          this.gameNotifications[index].progress = progress;
          this.gameNotifications.splice(index, 1, this.gameNotifications[index]);
          //this.spliceNotification(index, this.gameNotifications[index]);
        });

        this.socket.on('gameCountdown', (id, time) => {
          let index = null;
          if (this.gameNotifications.length === 0) index = -1;
          else index = this.gameNotifications.findIndex(async index => {
            while (!index.id) {
              await new Promise(resolve => setTimeout(resolve, 0));
              console.log('waiting in findIndex function...');
            }
            index.id === id
          });
          if (index === -1) {
            console.log('gameCountdown - Index not found - creating new notification object for id: ', id);
            index = this.gameNotifications.length;
            this.gameNotifications.push(
              {
                id: id,
                progress: undefined,
                countdown: 0,
                notificationArr: []
              }
            );
          }
          this.gameNotifications[index].countdown = 0;
          this.gameNotifications[index].countdown = time;
          this.gameNotifications.splice(index, 1, this.gameNotifications[index]);
          //this.spliceNotification(index, this.gameNotifications[index]);
        });

        this.socket.on('gameStopCountdown', id => {
          console.log(`I'm told to stop countdown timer...`, id);
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

    //Splice methods to avoid undefined values in arrays while splice is operating across multiple functions
    /*
    async spliceInstance(index, data) {
      this.instancePromise = new Promise(resolve => {
        this.instances.splice(index, 1, data);
        resolve;
      });
    }
    */
    /*
    async spliceNotification(index, data) {
      
      if (this.notificationPromise) await this.notificationPromise;
      
      this.notificationPromise = new Promise(resolve => {
        this.gameNotifications.splice(index, 1, data);
        resolve;
      }).then(this.notificationPromise = null);
    }
    */
}