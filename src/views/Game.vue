<template>
  <div class="container has-text-centered is-unselectable">
    <div v-if="!isActive">
      <Options />
      <Start />
    </div>
    <div v-if="isActive">
      <TicTacToe />
    </div>
  </div>
</template>


<script>
import Options from "@/components/Options.vue";
import TicTacToe from "@/components/TicTacToe.vue";
import Start from "@/components/Start.vue";

export default {
  computed: {
    isActive() {
      return this.$store.state.ticTacToeGame.isActive;
    }
  },
  components: {
    Options,
    TicTacToe,
    Start
  }
};
</script>