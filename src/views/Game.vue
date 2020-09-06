<template>
  <div>
    <section class="hero is-small is-dark is-bold">
      <div class="hero-body has-text-centered">
        <h1 class="title">Tic Tac Toe</h1>
        <div v-if="!isActive">
          <Options />
          <Start />
        </div>
        <TicTacToe v-if="isActive" />
      </div>
    </section>
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