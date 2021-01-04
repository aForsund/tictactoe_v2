<template>
  
    <div class="buttons has-addons">
      <button class="button is-primary" v-bind:class="{ 'is-success': instance.id === activeInstanceId }" @click="clickInstance()">
        
        <span v-if="instance.started && !instance.completed">
          
          {{`
            Game vs ${instance.playerOne.player === user.name ? instance.playerTwo.player : instance.playerOne.player} -
            round: ${instance.game.status.turnCount} 
            turn: ${instance.game.playerOne.turn ? instance.playerOne.player === user.name ? 'You' : instance.playerTwo.player 
              : instance.playerTwo.player === user.name ? 'You': instance.playerOne.player}
            `}}
        </span>
        <span v-else-if="instance.completed">
          Game Completed
          
        </span>
        <span v-else>
          {{ `Game vs ${user.name === instance.playerOne.player ? instance.playerTwo.player : instance.playerOne.player} ready to join` }}
        </span>
        
      </button>
      <button v-if="instance.completed" class="button is-danger" @click="removeInstance(instance.id)">X</button>
    </div>
 
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: {
    instance: [Object],
    active: Boolean
  },
  computed: {
    ...mapGetters('user', ['user', 'activeInstanceId']),
  },
  methods: {
     ...mapActions('user', ['activateInstance', 'joinGame', 'removeInstance']),
    clickInstance() {
        console.log('clickInstance');
        console.log(this.instance.id);
        if (!this.instance.started) {
          console.log('joingame')
          this.joinGame(this.instance.id);
        }
        
        this.activateInstance(this.instance.id);
      },
  }

}
</script>

<style scoped>
.button {
  transition: all 0.4s;
}

</style>