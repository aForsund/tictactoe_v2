const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const User = mongoose.model('User');


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
    let add = true;
    console.log('user: ', user);
    console.log('notification: ', notification);
     
    try {
      await User.findOne({ username: user }, (err, res) => {
        if(err) {
          add = false;
          throw new Error(err.message, null);
        } else {
          let length = res.notifications.length;
          console.log('length: ', length);
          for (let i = 0; i < length; i++) {
            
            if (res.notifications[i].username === notification.username) {
              console.log(`${user} already challenged by ${notification.username}`);
              add = false;
              return add;
            }
          }
          if (add) {
            notification.id = uuidv4();
            res.notifications.push(notification);
            res.save();
          }
        }
      })
      
    } catch (error) {
      console.log(error);

    }
    return add;
    
  
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

    /*
    let update = true;
    try {
      User.findOne({ username: user }, (err, res) => {
        if(err) {
          update = false;
          throw new Error(err.message, null);
        } else {
          let length = res.notifications.length;
          console.log('length: ', length);
          console.log(res.notifications);

          for (let i = 0; i < length; i++) {
            if (res.notifications[i].id === notificationId) {
              console.log('trying to pull id: ', i);
              res.notifications.pull(i);
              res.save();
              return;
            }
          }
        }
      })
      .then(() => { return update })
      .catch(error => console.log(error));
    } catch (error) {
      console.log('error from removeNotification: ');
      console.log(error);
    }
    */
  }
};