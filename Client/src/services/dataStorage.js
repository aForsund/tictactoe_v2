


export default class DataStorage {
  constructor() {
    this.index = [];
    this.collection = {};


    this.emptyObject = {
      started: false,
      completed: false,
      lastUpdate: null,
      progress: undefined,
      notifications: [],
      game: {
        board: null,
        currentMove: null,
        currentPlayer: null,
        history: null,
        playerOne: null,
        playerTwo: null,
        status: null
      }
    }
  }

  //Add a new game to collection
  addGame(game) {
    this.index.push(game.id);

    this.collection[game.id] = {...this.emptyObject};


    
  }
  //Delete game from collection
  deleteGame(id) {
    let i = this.index.findIndex(index => index === id);
    this.index.splice(i, 1);
    delete this.collection[id];
  }
  //Update game object in collection
  updateGame(game) {
    //Create game object if it does not exist
    if (!this.collection[game.id]) this.addGame(game);

    //More updates to collection to be added as required in client implementation...
    //this.collection[game.id] = (Object.assign({}), game)
    else this.collection[game.id] = {...game}
    //this.collection[game.id] = Object.assign({}, this.collection[game.id], game);
    //if (!this.collection[game.id].started && game.started) Vue.set(this.collection, [game.id].started, game.started);
    //if (game.completed) Vue.set(this.collection, [game.id].completed, game.completed);
    //if (game.game) Vue.set(this.collection, [game.id].game, JSON.parse(JSON.stringify(game.game)));
  }
  //Update progress indicator in collection
  updateProgress(id, progress) {
    //Vue.set(this.collection, [id].progress, progress);
    Vue.set(this.collection, [id].progress, progress); 
  }
  //Add notification to collection
  addNotification(id, overwrite, notification) {
    let empty = false;
    if (!this.collection[id].notifications) {
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
  }
  //Update countdown indicator in collection
  updateCountdown(id, time = undefined) {
    Vue.set(this.collection, [id].countdown, time);
  }
}