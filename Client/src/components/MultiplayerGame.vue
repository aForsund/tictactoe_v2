<template>
  <div class="container has-text-centered tictactoe">
    
    
      <p class="title">{{ `Game vs ${activeInstance.playerOne.player === user.name ? activeInstance.playerOne.player : activeInstance.playerTwo.player}` }}</p>
    <!-- 
      <div class="notification is-dark has-text-left">
        <div v-if="gameNotifications">
        <div v-for="(entry, index) in gameNotifications" :key="index">
          <p class="is-size-7 is-family-code">{{ entry }}</p>
        </div>
        </div>
    
    
     
      </div>
    -->     
      <GameNotifications :instance="activeInstance" />
      <Progressbar :instance="activeInstance" />
       
    <div v-if="activeInstance.started">
      <div class="columns is-mobile">
        <div class="column">
          <div>
            <h1 class="subtitle" key="playerOne">X: {{ activeInstance.playerOne.player }}</h1>

            <h1 class="title" :key="activeInstance.playerOne.score">
              {{ activeInstance.playerOne.score }}
            </h1>
          </div>
        </div>
        <div class="column is-narrow">
          <div>
            <h1 class="subtitle" key="turn">Turn</h1>

            <h1 class="title" :key="activeInstance.game.status.turnCount">
              {{ activeInstance.game.status.turnCount }}
            </h1>
          </div>
        </div>
        <div class="column">
          <div>
            <h1 class="subtitle" key="playerTwo">O: {{ activeInstance.playerTwo.player }}</h1>

            <h1 class="title" :key="activeInstance.playerTwo.score">
              {{ activeInstance.playerTwo.score }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    

    <div v-if="activeInstance.game" class="board">
      <div v-for="(n, i) in activeInstance.game.board" :key="`row${i + 1}`" class="row">
        <div
          v-for="(n, j) in activeInstance.game.board[i]"
          class="cell"
          :key="`row${i + 1}col${j + 1}`"
          v-bind:id="`row${i + 1}col${j + 1}`"
          v-bind:class="{
            'has-text-primary has-text-weight-medium': isLastMove(
              `row${i + 1}col${j + 1}`
            ),
            'has-text-primary glowing': isHighlighted(`row${i + 1}col${j + 1}`)
          }"
          @click="confirmInput(`row${i + 1}col${j + 1}`)"
        >
          <transition-group name="fade">
            <span :key="`row${i + 1}col${j + 1}`">{{ activeInstance.game.board[i][j] }}</span>
          </transition-group>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="activeInstance.game" class="container has-text-centered mt-4 mb-2 status-message">
        <div>
          <div class="pt-1">
            <p class="title" v-bind:class="{ 'has-text-primary': activeInstance.game.status.isEnded }">
              <span v-if="activeInstance.game.status.isEnded">{{ result.outcome === 'draw' ? 'It\'s a draw' : `${result.outcome.mark} has won` }}</span>
              <span v-else>{{ activeInstance.game.currentPlayer.mark }}'s turn</span>
            </p>
            <p ref="element" class="subtitle" v-bind:class="{ 'has-text-primary': activeInstance.game.status.isEnded }">
              <span v-if="activeInstance.game.status.isEnded">Press here to play again</span>
              <span v-else-if="activeInstance.game.history.length === 0">Let's go</span>
              
              <span v-else
                >Last move:
                {{ activeInstance.game.history[activeInstance.game.history.length - 1].player.mark }} to [{{
                  activeInstance.game.history[activeInstance.game.history.length - 1].move[0] + 1
                }}, {{ activeInstance.game.history[activeInstance.game.history.length - 1].move[1] + 1 }}]
              </span>
            </p>
          </div>
          
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="container has-text-centered">
        

        <button class="button is-danger opt" v-on:click="closeGame">
          Close
        </button>
        
      </div>
    </transition>
    
  </div>
  
  
  
  
</template>

<script>
   import Progressbar from '@/components/Progressbar.vue';
   import GameNotifications from '@/components/GameNotifications.vue';

  import { mapActions, mapGetters } from 'vuex';

  export default {
    
    components: {
      Progressbar,
      GameNotifications
    
  },
  computed: {
    ...mapGetters('user', ['user', 'activeInstance'])
  },
  data() {
    return {
      
      processingInput: false
    };
  },
  methods: {
    ...mapActions('user', ['makeMove']),
    isHighlighted(id) {
      return this.activeInstance.game.status.winCondition.includes(
        id
      );
    },
    isLastMove(id) {
      
      if (this.activeInstance.game.currentMove) {
        let [i, j] = this.activeInstance.game.currentMove;
        return this.activeInstance.game.gridReference[i][j] === id;
      }
    },
    viewHistory() {
      this.$store.commit("VIEW_HISTORY");
    },
    endRound() {
      console.log('endround...');
    },
    closeGame() {
      console.log('closegame...');
    },
    async confirmInput(move) {
      console.log(move);
      if (this.activeInstance.game.status.isEnded) return;
      if (this.processingInput === true) return;
      else {
        this.processingInput = true;
        this.makeMove(move);
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.processingInput = false;
      }
    },
  }
};
</script>










<style scoped>
.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell {
  width: 80px;
  height: 80px;
  font-size: 42px;

  display: flex;
  align-items: center;
  justify-content: center;
}

#row1col2,
#row2col2,
#row3col2 {
  border-left: 2px solid rgb(255, 255, 255, 0.3);
  border-right: 2px solid rgb(255, 255, 255, 0.3);
}
#row2col1,
#row2col2,
#row2col3 {
  border-bottom: 2px solid rgb(255, 255, 255, 0.3);
  border-top: 2px solid rgb(255, 255, 255, 0.3);
}

.fade-enter-active {
  animation: fadeIn 0.5s;
}
.fade-leave-active {
  animation: fadeOut 0.5s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.glowing {
  text-shadow: 0px 0px 6px #8c67ef;
}

.status {
  background-color: hsl(171, 100%, 41%, 0.3);
  border-radius: 5px;
}

.tictactoe {
  max-width: 320px;
}

.info {
  height: 5rem;
  transition: all 0.5s;
}
.opt {
  width: calc(20% - 0.5rem);
  margin: 0 0.5rem;
}
.status-message {
  height: 5.25rem;
}

</style>


