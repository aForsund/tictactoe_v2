
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
    console.log('trying to push notification to ', user);
    console.log(notification);
    let success = true;
         
    try {
      await User.findOne({ username: user }, async (err, res) => {
        if(err) {
          success = false;
          throw new Error(err.message, null);
        } else {
          console.log('response: ')
          console.log(res);
          let length = res.notifications.length;
          console.log('length: ', length);
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
  startNewGame: async (id, instance) => {
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
        console.log(playerX_id);
        playerX_fetched = true;
        
      })
      .catch(err => console.log(err));
    await User.findOne({ username: playerO_name })
      .then(user => {
        playerO_id = user._id;
        console.log(playerX_id);
        playerO_fetched = true;
      })
      .catch(err => console.log(err));
    console.log('playerX fetched: ', playerX_fetched);
    console.log('playerO fetched: ', playerO_fetched);
    if (playerX_fetched && playerO_fetched) {
      
      let insertData = {
        instance: instance,
        playerX_id: playerX_id,
        playerO_id: playerO_id,
        completed: false
      }
      
      await Game.findOneAndUpdate({ id: id}, insertData, { upsert: true })
        .then(() => {
          console.log('game successfully saved to DB...');
          success = true;
        })
        .catch(err => {
          console.log(err);
        });

    }
    console.log('returning: ', success);
    return success;
  },

  updateGame: async (id, instance) => {
    await Game.findOneAndUpdate({ id: id }, { instance: instance })
      .then(() => { return true; })
      .catch(err => {
        console.log(err);
        return false;
      })
  },

  endGame: async (id, instance, result) => {},
  updateUsers: async (id, instance) => {},

};