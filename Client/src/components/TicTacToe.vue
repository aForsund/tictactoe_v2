<template>
  <div class="container has-text-centered tictactoe">
    <transition name="fade">
      <div class="columns is-mobile">
        <div class="column">
          <div>
            <h1 class="subtitle" key="playerOne">X: {{ playerOne }}</h1>

            <h1 class="title" :key="playerOneScore">
              {{ playerOneScore }}
            </h1>
          </div>
        </div>
        <div class="column is-narrow">
          <div>
            <h1 class="subtitle" key="turn">Turn</h1>

            <h1 class="title" :key="game.status.turnCount">
              {{ game.status.turnCount }}
            </h1>
          </div>
        </div>
        <div class="column">
          <div>
            <h1 class="subtitle" key="playerTwo">O: {{ playerTwo }}</h1>

            <h1 class="title" :key="playerTwoScore">
              {{ playerTwoScore }}
            </h1>
          </div>
        </div>
      </div>
    </transition>

    <div class="board">
      <div v-for="(n, i) in game.board" :key="`row${i + 1}`" class="row">
        <div
          v-for="(n, j) in game.board[i]"
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
            <span :key="`row${i + 1}col${j + 1}`">{{ game.board[i][j] }}</span>
          </transition-group>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="container has-text-centered mt-4 mb-2 status-message">
        <div>
          <div class="pt-1" v-on:click="handleClick">
            <p class="title" v-bind:class="{ 'has-text-primary': isEnded }">
              <span v-if="isEnded">{{ result.outcome === 'draw' ? 'It\'s a draw' : `${result.outcome.mark} has won` }}</span>
              <span v-else>{{ game.currentPlayer.mark }}'s turn</span>
            </p>
            <p ref="element" class="subtitle" v-bind:class="{ 'has-text-primary': isEnded }">
              <span v-if="isEnded">Press here to play again</span>
              <span v-else-if="game.history.length === 0">Let's go</span>
              <span v-else-if="isLoading">{{ statusText }}</span>
              <span v-else
                >Last move:
                {{ game.history[game.history.length - 1].player.mark }} to [{{
                  game.history[game.history.length - 1].move[0] + 1
                }}, {{ game.history[game.history.length - 1].move[1] + 1 }}]
              </span>
            </p>
          </div>
          
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="container has-text-centered">
        <button class="button is-info opt" v-on:click="resetGame">Reset</button>

        <button class="button is-danger opt" v-on:click="closeGame">
          Close
        </button>
        <button v-if="isEnded" class="button is-primary" @click="viewHistory">View History</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      game: state => state.localGame.instance,
      result: state => state.history.result,
      isEnded: state => state.localGame.instance.status.isEnded,
      isLoading: state => state.localGame.instance.status.showLoading,
      statusText: state => state.localGame.instance.status.statusText,
      playerOneScore: state => state.localGame.playerOneScore,
      playerTwoScore: state => state.localGame.playerTwoScore,
      playerOne: state =>
        state.localGame.instance.playerOne.cpu
          ? `CPU#${state.localGame.instance.playerOne.difficulty}`
          : "Player",

      playerTwo: state =>
        state.localGame.instance.playerTwo.cpu
          ? `CPU#${state.localGame.instance.playerTwo.difficulty}`
          : "Player"
    })
  },
  created() {
    this.newGame();
    this.unwatchGameStatus = this.$watch("isEnded", newStatus => {
      console.log(`updating isEnded to ${newStatus}`);
      if (newStatus) this.endRound();
    });
    
  },
  beforeDestroy() {
    console.log("** calling unwatchGameStatus **");
    this.unwatchGameStatus();
  },
  data() {
    return {
      historyObj: {},
      processingInput: false
    };
  },
  methods: {
    newGame() {
      this.$store.commit("NEW_GAME");
    },
    isHighlighted(id) {
      return this.$store.state.localGame.instance.status.winCondition.includes(
        id
      );
    },
    isLastMove(id) {
      if (this.game.currentMove) {
        let [i, j] = this.game.currentMove;

        return this.game.gridReference[i][j] === id;
      }
    },
    viewHistory() {
      this.$store.commit("VIEW_HISTORY");
    },
    endRound() {
      this.historyObj.history = this.history;
      this.historyObj.outcome = this.game.status.draw
        ? "draw"
        : this.game.currentPlayer;
      this.historyObj.winCondition = this.game.status.winCondition;
      this.historyObj.board = this.game.board;
      this.$store.commit("SAVE_RESULT", this.historyObj);
      this.$store.commit("SAVE_HISTORY", this.game.history);
      this.$store.commit("SAVE_BOARD", this.game.board);
      this.$store.commit("CHANGE_STEP", this.game.status.turnCount - 1);
      this.$store.commit(
        "END_ROUND",
        this.game.status.draw ? "draw" : this.game.currentPlayer.mark
      );
    },
    resetGame() {
      this.$store.commit("RESET_GAME");
      this.newGame();
    },
    closeGame() {
      this.$store.commit("RESET_GAME");
      this.$store.commit("CLOSE_GAME");
    },
    confirmInput(id) {
      console.log(id);
      if (this.processingInput === true) return;
      else {
        this.processingInput = true;
        if (!this.isEnded) this.game.confirmInput(id);
        this.processingInput = false;
      }
    },
    handleClick() {
      console.log("handleClick method");
      if (this.isEnded) this.newGame();
    }
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


