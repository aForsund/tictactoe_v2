<template>
  <div class="mb-4">
    <p class="subtitle mb-2">{{ getValue ? `Countdown: ${value/1000} `: 'Waiting for input..'}}</p>
    
    <b-progress type="is-primary" size="is-large" :value="showCountdown ? getValue : gameProgress">
      
    </b-progress>
    
  </div>  

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    instance: [Object]
  },
  data() {
    return {
      value: 0,
      format: 'raw',
      timer: null,
      interval: 1000
    }
  },
  computed: {
    ...mapGetters('user', ['gameProgress', 'gameCountdown']),
    
    getValue() {
      if (!this.gameCountdown) return undefined; 
      else return ((this.value/this.gameCountdown)*100);
    },
    showCountdown() {
      return this.instance.started;
    }
  },
  methods: {
    ...mapActions('user', ['clearCountdown']),
    startInterval() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        console.log('inside interval');
        this.value = this.value - this.interval;
        console.log(this.value);
        if(this.value <= 0 || !this.value) {
          this.stopInterval();
        }
      }, this.interval);
    },
    stopInterval() {
      clearInterval(this.timer);
      this.timer = null;
      this.value = 0;
      this.clearCountdown(this.instance.id);
    }
  },
  watch: {
    gameCountdown: function() {
      console.log('***********************************gameCountdown: ', this.gameCountdown);
      this.value = this.gameCountdown;
      this.startInterval();
    }
  }
}
</script>