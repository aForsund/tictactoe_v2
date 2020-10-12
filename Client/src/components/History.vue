<template>
  <div class="container has-text-centered tictactoe">
    <h1 class="title">HISTORY MODE</h1>
    <div class="notification is-primary">
      <p>Winner: {{ result.outcome.mark }}</p>
      <p>Turns: {{ history.length }}</p>
      <p>
        Player:
        {{
          result.outcome.cpu
            ? `CPU#${result.outcome.difficulty}`
            : "Local Player"
        }}
      </p>
    </div>

    <div class="board mb-4">
      <div v-for="(n, i) in board" :key="i" :id="`row${i + 1}`" class="row">
        <div
          v-for="(n, j) in board[i]"
          class="cell"
          v-bind:id="`row${i + 1}col${j + 1}`"
          :key="`row${i + 1}col${j + 1}`"
          v-bind:class="{
            'has-text-primary glowing': isHighlighted(`row${i + 1}col${j + 1}`)
          }"
        >
          <transition name="fade"
            ><span>{{ board[i][j] }}</span></transition
          >
        </div>
      </div>
    </div>
    <b-steps v-model="activeStep" animated rounded has-navigation>
      <template v-for="(n, i) in history">
        <b-step-item
          :step="i + 1"
          :key="`turn${i + 1}`"
          :clickable="true"
        ></b-step-item>
      </template>
    </b-steps>
    <h2 class="subtitle">
      {{ history[activeStep].player.mark }} on {{ history[activeStep].move }}
    </h2>

    <button class="button is-danger opt" @click="closeHistory">
      Close
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      history: state => state.history.instance,
      result: state => state.history.result,
      board: state => state.history.board
    }),
    activeStep: {
      get() {
        return this.$store.state.history.step;
      },
      set(value) {
        this.$store.commit("CHANGE_STEP", value);
        console.log("CHANGE_HISTORY_BOARD", value);
        console.log("history value", this.history[value]);
        this.$store.commit("CHANGE_HISTORY_BOARD", this.history[value]);
      }
    }
  },

  methods: {
    isHighlighted(id) {
      return this.activeStep + 1 === this.history.length
        ? this.result.winCondition.includes(id)
        : false;
    },
    changeStep() {},
    closeHistory() {
      this.$store.commit("CLOSE_HISTORY");
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


