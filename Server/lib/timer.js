module.exports = class Timer {
  constructor(id, time) {
    this.id = id;
    this.time = time;
    this.timer = null;
    this.promise = new Promise((resolve, reject) => {
      this.cancel = reject;
      this.resolve = resolve;
    })
    .catch(() => {
      console.log('timer was cancelled...');
      clearTimeout(this.timer);
    });
    
    this.timeout = false;
    this.start();
  }
  start() {
    this.timer = setTimeout(() => {
      
      this.resolve();
      this.timeout = true;
    }, this.time);
  }
}
      
      
    


