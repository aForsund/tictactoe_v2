<template>
  <div>
      <button class="button is-primary" @click="clickInstance()">
        <span v-if="instance.start">
          
          {{`
            Game vs ${instance.playerOne.player === user.name ? instance.playerOne.player : instance.playerTwo.player} -
            round: ${instance.game.status.turnCount} 
            turn: ${instance.game.playerOne.turn ? instance.playerOne.player === user.name ? 'You' : instance.playerTwo.player 
              : instance.playerTwo.player === user.name ? 'You': instance.playerOne.player}
            `}}
        </span>
        <span v-else>
          {{ `Game vs ${user.name === instance.playerOne.player ? instance.playerTwo.player : instance.playerOne.player} ready to join` }}
        </span>
        
      </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: {
    instance: [Object]
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    ...mapGetters('user', ['user', 'activeInstance'])
  },
  methods: {
    ...mapActions('user', ['dismiss', 'joinGame', 'activateInstance']),
    clickInstance(instance) {
      
      if(this.count >= 10) {
        console.log(instance);
        console.log(this.user);
      }
      else {

      
      this.joinGame(this.instance);
      this.activateInstance(this.instance.id);
      this.count = this.count + 1;
      } 
    },
  }
}
</script>

<style scoped>
.button {
  transition: all 0.4s;
}
</style>