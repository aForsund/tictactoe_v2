<template>
  <div class="mb-4">
    <p v-if="instance.completed" class="subtitle mb-2">Game completed</p>
    <p v-else class="subtitle mb-2">{{ getValue ? `Countdown: ${gameCountdown.value/1000} `: 'Waiting for input..'}}</p>
    <b-progress type="is-primary" size="is-large" :value="showCountdown ? getValue : gameProgress"></b-progress>
  </div>  

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    instance: [Object]
  },
  computed: {
    ...mapGetters('user', ['gameProgress', 'gameCountdown']),
    
    getValue() {
      if (this.instance.completed) return undefined;
      if (!this.gameCountdown) return undefined;
      if (!this.gameCountdown.value) return undefined;
      else return this.gameCountdown.value/this.gameCountdown.startValue*100;
      
    },
    showCountdown() {
      return this.instance.started || this.gameCountdown;
    }
  },
}
</script>