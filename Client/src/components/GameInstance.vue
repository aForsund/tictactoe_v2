<template>
  <div>
      <button class="button is-primary" :class="{ 'is-danger': instance.id === activeInstance ? activeInstance.id : null }" @click="clickInstance">
        <span v-if="instance.started">
          
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
  computed: {
    ...mapGetters('user', ['user', 'activeInstance'])
  },
  methods: {
    ...mapActions('user', ['dismiss', 'joinGame', 'activateInstance']),
    clickInstance() {
      console.log('clickInstance');
      console.log(this.instance);
      if (!this.instance.started) {
        console.log('joingame')
        this.joinGame(this.instance);
      }else {
        console.log('activateInstance', this.instance.id);
        this.activateInstance(this.instance);
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