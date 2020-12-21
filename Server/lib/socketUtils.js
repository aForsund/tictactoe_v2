
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Game = mongoose.model('Game');


module.exports = {

  formatMessage: (username, text) => {
    let date = new Date();
    return {
      username,
      text,
      day: date.getDay(),
      hour: date.getHours(),
      minute: date.getMinutes(),      
    };
  },
  addNotification: async (user, notification) => {
    let success = true;
         
    try {
      await User.findOne({ username: user }, async (err, res) => {
        if(err) {
          success = false;
          throw new Error(err.message, null);
        } else {
          let length = res.notifications.length;
          
          for (let i = 0; i < length; i++) {
            if (res.notifications[i].challenger === notification.challenger && res.notifications[i].challenge) {
              console.log(`${user} already challenged by ${notification.challenger}`);
              success = false;
              return success;
            }
          }
          if (success) {
            res.notifications.push(notification);
            await res.save();
          }
        }
      })
      
    } catch (error) {
      console.log(error);

    }
    return success;
    
  
  },
  removeNotification: async(user, notificationId) => {
    let success = false;
    try {
      await User.findOneAndUpdate(
        {
          username: user
        },
        {
          $pull: {
            notifications: { id: notificationId }
          }
        }
      ).then(() => success = true).catch(error => console.log(error));

    } catch (error) {
      console.log(error);
    }
    return success;
  
  },

  startNewGame: async (instance) => {
    let success = false;
    let playerX_fetched = false;
    let playerO_fetched = false
    let playerX_name = instance.playerOne.player;
    let playerX_id = null;
    let playerO_name = instance.playerTwo.player;
    let playerO_id = null;
    await User.findOne({ username: playerX_name })
      .then(user => {
        playerX_id = user._id;
        playerX_fetched = true;
        
      })
      .catch(err => console.log(err));
    await User.findOne({ username: playerO_name })
      .then(user => {
        playerO_id = user._id;
        playerO_fetched = true;
      })
      .catch(err => console.log(err));
    
    if (playerX_fetched && playerO_fetched) {
    
      //id gets inserted by findOneAndUpdate method with upsert flag - check this!!
      instance.lastUpdate = Date.now();
      instance.playerX_id = playerX_id;
      instance.playerO_id = playerO_id;
      
      let insertData = JSON.parse(JSON.stringify(instance));

      //Update database
      let DBobject = new Game(insertData);
      await DBobject.save()
        .then(() => {
          console.log('game successfully saved to DB...');
          success = true;
        })
        .catch(err => {
          console.log(err);
        });

    }
    return success;
  },

  updateGame: async (instance) => {

    let updated = false;
    instance.lastUpdate = Date.now();

    await Game.findOneAndUpdate({ id: instance.id }, JSON.parse(JSON.stringify(instance)))
      .then(() => { 
        updated = true; })
      .catch(err => {
        console.log(err);
      });
    return updated;
  },

  findGame: async (id) => {
    let response = false;
    await Game.findOne({ id: id})
      .then(res => {
        if (res) response = true;
      })
      .catch(err => {
        console.log(err);

      });
    return response;
  },

  getActiveGames: async () => {
    let response = null;
    await Game.find({ $and: [{ started: true }, { completed: false }]})
      .then(res => {
        response = res
      })
      .catch(err => console.log(err));
    return response;
  },

  endGame: async (id, instance, result) => {},
  updateUsers: async (id, instance) => {},
  
 
};