module.exports = class Timer {
  constructor(time) {
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
      this.timeout = true;
      this.resolve();
     }, this.time);
  }
}
      
      
    


