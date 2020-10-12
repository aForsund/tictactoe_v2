<template>
  <div class="hero-body">
    <div class="container has-text-centered is-unselectable game">
      <div v-if="!localGame && !historyView">
        <Options />
        <Start />
      </div>
      <div v-else-if="historyView">
        <History />
      </div>
      <div v-else>
        <TicTacToe />
      </div>
    </div>
  </div>
</template>


<script>
import Options from "@/components/Options.vue";
import TicTacToe from "@/components/TicTacToe.vue";
import Start from "@/components/Start.vue";
import History from "@/components/History.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      localGame: state => state.localGame.isActive,
      historyView: state => state.history.isActive
    })
  },
  components: {
    Options,
    TicTacToe,
    Start,
    History
  }
};
</script>

