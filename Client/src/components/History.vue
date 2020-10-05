<template>
  <div class="container has-text-centered tictactoe">
    <h1 class="title">HISTORY MODE</h1>
    <p>{{ history }}</p>

    <button class="button is-danger opt" v-on:click="closeHistory">
      Close
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      history: state => state.localGame.instance.history,

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
  data() {
    return {
      historyObj: {},
      statusMessage: "Status message...",
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
    viewHistory() {
      console.log(this.historyObj);
    },
    showVuexHistory() {
      console.log(this.history);
    },
    endRound() {
      this.historyObj.history = this.history;
      this.historyObj.outcome = this.game.status.draw
        ? "draw"
        : this.game.currentPlayer;
      this.historyObj.winCondition = this.game.status.winCondition;
      this.historyObj.board = this.game.board;
      this.$store.commit("SAVE_HISTORY", this.historyObj);
      this.$store.commit(
        "END_ROUND",
        this.game.status.draw ? "draw" : this.game.currentPlayer.mark
      );
    },
    resetGame() {
      this.$store.commit("RESET_GAME");
      this.newGame();
    },
    closeHistory() {
      this.$store.commit("CLOSE_HISTORY");
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

.glowing {
  text-shadow: 0px 0px 6px #8c67ef;
}
.status {
  background-color: #8c67ef4d;
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


