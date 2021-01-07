<template>
 
  <div class="buttons has-addons">
    <button class="button is-primary" v-bind:class="{ 'is-success': id === activeInstanceId }" @click="clickInstance()">
      
      <span v-if="socket.collection[id].started && !socket.collection[id].completed">
        {{`
          Game vs ${socket.collection[id].playerOne.player === user.name ? socket.collection[id].playerTwo.player : socket.collection[id].playerOne.player} -
          round: ${socket.collection[id].game.status.turnCount} 
          turn: ${socket.collection[id].game.playerOne.turn ? socket.collection[id].playerOne.player === user.name ? 'You' : socket.collection[id].playerTwo.player 
            : socket.collection[id].playerTwo.player === user.name ? 'You': socket.collection[id].playerOne.player}
          `}}
      </span>
      <span v-else-if="socket.collection[id].completed">
        Game Completed
      </span>
      <span v-else>
        {{ `Game vs ${user.name === socket.collection[id].playerOne.player ? socket.collection[id].playerTwo.player : socket.collection[id].playerOne.player} ready to join` }}
      </span>
      
    </button>
    <button v-if="socket.collection[id].completed" class="button is-danger" @click="removeInstance(id)">X</button>
</div>
 
 
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  props: {
    instanceId: String
  },
  data() {
    return {
      id: null
    }
  },
  computed: {
    ...mapGetters('user', ['user', 'socket', 'activeInstanceId']),
    
  },
  methods: {
     ...mapActions('user', ['activateInstance', 'joinGame', 'removeInstance']),
     clickInstance(){
        
        console.log('clickInstance');
        console.log(this.id);
        if (!this.socket.collection[this.id].started) {
          console.log('joingame')
          this.joinGame(this.id);
        }
        
        this.activateInstance(this.id);
      },
  },
  created() {
    this.id = this.instanceId;
  }

}
</script>

<style scoped>
.button {
  transition: all 0.4s;
}

</style>