<template>
  <div class="container">
    <div class="has-text-primary columns info">
      <div class="column">
        <p>
          <span class="is-bold">X</span>
          : {{ getPlayerOne }}
        </p>
        <p>Score: {{ getPlayerOneScore }}</p>
      </div>
      <div class="column is-narrow">
        <p>Turn: {{ getTurnCount }}</p>
      </div>

      <div class="column">
        <p>
          <span class="is-bold">O</span>
          : {{ getPlayerTwo }}
        </p>
        <p>Score: {{ getPlayerOneScore }}</p>
      </div>
    </div>
    <div class="board">
      <div class="row" id="row1">
        <div
          class="cell"
          v-bind:class="{ 'has-text-primary glowing': isHighlighted('row1col1') }"
          id="row1col1"
          v-on:click="confirmInput($event.target.id)"
        >
          <transition name="fade">
            <span :key="board[0][0]">{{ board[0][0] }}</span>
          </transition>
        </div>

        <div
          class="cell"
          v-bind:class="{ 'has-text-primary glowing': isHighlighted('row1col2') }"
          id="row1col2"
          v-on:click="confirmInput($event.target.id)"
        >
          <transition name="fade">
            <span :key="board[0][1]">{{ board[0][1] }}</span>
          </transition>
        </div>
        <div
          class="cell"
          v-bind:class="{ 'has-text-primary glowing': isHighlighted('row1col3') }"
          id="row1col3"
          v-on:click="confirmInput($event.target.id)"
        >
          <transition name="fade">
            <span :key="board[0][2]">{{ board[0][2] }}</span>
          </transition>
        </div>
      </div>
      <div class="row" id="row2">
        <div
          class="cell"
          v-bind:class="{ 'has-text-primary glowing': isHighlighted('row2col1') }"
          id="row2col1"
          v-on:click="confirmInput($event.target.id)"
        >
          <transition name="fade">
            <span :key="board[1][0]">{{ board[1][0] }}</span>
          </transition>
        </div>
        <div
          class="cell"
          v-bind:class="{ 'has-text-primary glowing': isHighlighted('row2col2') }"
          id="row2col2"
          v-on:click="confirmInput($event.target.id)"
        >
          <transition name="fade">
            <span :key="board[1][1]">{{ board[1][1] }}</span>
          </transition>
        </div>
        <div
          class="cell"
          v-bind:class="{ 'has-text-primary glowing': isHighlighted('row2col3') }"
          id="row2col3"
          v-on:click="confirmInput($event.target.id)"
        >
          <transition name="fade">
            <span :key="board[1][2]">{{ board[1][2] }}</span>
          </transition>
        </div>
      </div>
      <div class="row" id="row3">
        <div
          class="cell"
          v-bind:class="{ 'has-text-primary glowing': isHighlighted('row3col1') }"
          id="row3col1"
          v-on:click="confirmInput($event.target.id)"
        >
          <transition name="fade">
            <span :key="board[2][0]">{{ board[2][0] }}</span>
          </transition>
        </div>
        <div
          class="cell"
          v-bind:class="{ 'has-text-primary glowing': isHighlighted('row3col2') }"
          id="row3col2"
          v-on:click="confirmInput($event.target.id)"
        >
          <transition name="fade">
            <span :key="board[2][1]">{{ board[2][1] }}</span>
          </transition>
        </div>
        <div
          class="cell"
          v-bind:class="{ 'has-text-primary glowing': isHighlighted('row3col3') }"
          id="row3col3"
          v-on:click="confirmInput($event.target.id)"
        >
          <transition name="fade">
            <span :key="board[2][2]">{{ board[2][2] }}</span>
          </transition>
        </div>
      </div>
    </div>
    <div class="status columns">
      <p class="column is-9" v-if="!isEnded">It's {{ getTurn }}'s turn</p>
      <p class="column is-9" v-if="isEnded">{{ statusMessage }}</p>
      <button class="column is-3 button is-primary is-pulled-right" v-if="isEnded">Play again</button>
      <button class="column is-3 button is-primary is-pulled-right" v-on:click="resetGame">Reset</button>
    </div>
  </div>
</template>

<script>
import { validInput, getIndex, checkStatus, computerChoice } from "@/game.js";

export default {
  computed: {
    getBoard() {
      return this.$store.state.ticTacToeGame.board;
    },
    getPlayerOne() {
      return this.$store.state.ticTacToeGame.playerOne.player;
    },
    getPlayerTwo() {
      return this.$store.state.ticTacToeGame.playerTwo.player;
    },
    getPlayerOneScore() {
      return this.$store.state.ticTacToeGame.playerOne.score;
    },
    getPlayerTwoScore() {
      return this.$store.state.ticTacToeGame.playerTwo.score;
    },
    playerOneHasTurn() {
      return this.$store.state.ticTacToeGame.playerOne.turn;
    },
    playerTwoHasTurn() {
      return this.$store.state.ticTacToeGame.playerTwo.turn;
    },

    getHighlightedCells() {
      return this.$store.state.ticTacToeGame.highlightedCells;
    },
    isEnded() {
      return this.$store.state.ticTacToeGame.isEnded;
    },
    getTurn() {
      return this.playerOneHasTurn ? this.playerMarks[0] : this.playerMarks[1];
    },
    getTurnCount() {
      return this.$store.state.ticTacToeGame.turnCount;
    }
  },

  data() {
    return {
      isActive: false,
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      gridReference: [
        ["row1col1", "row1col2", "row1col3"],
        ["row2col1", "row2col2", "row2col3"],
        ["row3col1", "row3col2", "row3col3"]
      ],
      playerMarks: ["X", "O"],
      playerOneScore: 0,
      playerTwoScore: 0,
      statusMessage: "Hello, this is the status message"
    };
  },
  created() {
    console.log(this.getBoard);
    console.log("p1: ", this.getPlayerOne);
    console.log("p2: ", this.getPlayerTwo);
    this.board = this.getBoard;
    //executes computerMove function to catch condition where both players are computer players
    this.computerMove();
  },
  watch: {},
  methods: {
    validInput,
    getIndex,
    checkStatus,
    computerChoice,

    updateBoard(i, j, value) {
      console.log("updating board...");
      console.log(i, j, value);
      this.board[i].splice(j, 1, value);
      this.$store.commit("updateBoard", this.board);
    },
    newTurn() {
      console.log("newturn function...");
      this.$store.commit("newTurn");
      //checkGameComplete();
    },
    closeGame() {},
    resetGame() {
      console.log("resetting game...");
      this.$store.commit("resetGame");
      this.board = this.getBoard;
    },
    endRound(result) {
      if (result === "X") {
        this.statusMessage = "PlayerOne has won!";
      } else if (result === "O") {
        this.statusMessage = "PlayerTwo has won!";
      } else {
        this.statusMessage = "It's a draw!";
      }
      this.$store.commit("endRound");
    },
    highlightBoard(idArray) {
      this.$store.commit("highlightBoard", idArray);
    },
    isHighlighted(id) {
      return this.getHighlightedCells.includes(id);
    },

    confirmInput(event) {
      console.log("confirm input method");
      console.log(event, this.board);
      //Check if input is valid
      if (this.validInput(event, this.board)) {
        console.log("validinput function ok");
        console.log("this get turn ", this.getTurn);
        console.log("this p1 has turn ", this.playerOneHasTurn);
        console.log("this p2 has turn ", this.playerTwoHasTurn);
        //Check if playerOne is human and has next turn
        if (this.getPlayerOne === "human" && this.playerOneHasTurn) {
          console.log("its player 1's turn");
          let [i, j] = this.getIndex(event);
          this.updateBoard(i, j, this.playerMarks[0]);
        }

        //Check if playerTwo is human and has next turn
        if (this.getPlayerTwo === "human" && this.playerTwoHasTurn) {
          console.log("its player 2's turn");
          let [i, j] = this.getIndex(event);
          this.updateBoard(i, j, this.playerMarks[1]);
        }
        this.nextIteration();
        this.computerMove();
      }
    },
    nextIteration() {
      //return if game has ended
      if (this.isEnded) return;

      //check if X or O is winner

      let status = this.checkStatus(
        this.getTurn === this.playerMarks[0]
          ? this.playerMarks[0]
          : this.playerMarks[1],
        this.board,
        this.getTurnCount
      );

      //Continue if no winner or not draw
      if (!status) {
        this.newTurn();
      }
      //end round if game cannot be decided
      else if (status === "draw") {
        this.endRound();
      }

      //else show win condition and end round
      else {
        this.highlightBoard(status);
        this.endRound(this.getTurn);
      }
    },

    async computerMove() {
      //perform returnconditions to exit loop
      console.log("hello from computermove funciton");
      if (this.isEnded) return;
      if (this.getPlayerOne === "human" && this.playerOneHasTurn) return;
      if (this.getPlayerTwo === "human" && this.playerTwoHasTurn) return;

      //Add delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (this.getPlayerOne === "cpuEasy" && this.playerOneHasTurn) {
        let [i, j] = this.computerChoice("easy", this.board);
        console.log("i: ", i);
        console.log("j: ", j);

        this.updateBoard(i, j, this.playerMarks[0]);

        this.nextIteration();
      } else if (this.getPlayerTwo === "cpuEasy" && this.playerTwoHasTurn) {
        let [i, j] = this.computerChoice("easy", this.board);
        console.log("i: ", i);
        console.log("j: ", j);

        this.updateBoard(i, j, this.playerMarks[1]);
        this.nextIteration();
      } else if (this.getPlayerOne === "cpuHard" && this.playerOneHasTurn) {
        let [i, j] = this.computerChoice(
          "hard",
          this.board,
          this.playerMarks[0]
        );
        console.log("i: ", i);
        console.log("j: ", j);

        this.updateBoard(i, j, this.playerMarks[0]);
      } else if (this.getPlayerTwo === "cpuHard" && this.playerTwoHasTurn) {
        let [i, j] = this.computerChoice(
          "hard",
          this.board,
          this.playerMarks[1]
        );
        console.log("i: ", i);
        console.log("j: ", j);

        this.updateBoard(i, j, this.playerMarks[1]);
      }

      //check if no human player is present - executes a loop until endcondition is met
      if (
        (this.getPlayerOne === "cpuEasy" || this.getPlayerOne === "cpuHard") &&
        (this.getPlayerTwo === "cpuEasy" || this.getPlayerTwo === "cpuHard")
      ) {
        this.computerMove();
      }
    }
  }
};
</script>










<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell {
  width: 100px;
  height: 100px;
  font-size: 42px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.board {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
}

.container {
  display: inline-block;
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
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.7);
}
.status {
  background-color: hsl(171, 100%, 41%, 0.3);
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>