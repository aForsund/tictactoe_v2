<template>
  <div class="mb-4">
    <p class="subtitle mb-2">{{ getText }}</p>
    <b-progress type="is-primary" size="is-medium" :value="showCountdown ? getValue : gameProgress" :show-value="displayValue" :format="getFormat" :precision="0">
      
    </b-progress>
    <p>{{ gameProgress }}</p>
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
      
      text: 'test',
      format: 'raw',
      timer: null,
      interval: 1000
    }
  },
  computed: {
    ...mapGetters('user', ['gameProgress', 'gameCountdown']),
    
    getValue() {
      return ((this.value/this.gameCountdown)*100);
    },
    displayValue() {
      return this.showValue;
    },
    getText() {
      return this.text;
    },
    getFormat() {
      return this.format;
    },
    showCountdown() {
      return this.value === 0 ? false : true;
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
        if(this.value <= 0) {
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