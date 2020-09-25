<template>
  <div class="container">
    <h1 class="title">Please select options</h1>

    <p class="mb-4 is-size-4">Player 1:</p>
    <button
      class="opt"
      v-bind:class="[defaultClass, options.player1 === 'human' ? activeClass : '']"
      v-on:click="selectPlayer1('human')"
    >Human</button>
    <button
      class="opt"
      v-bind:class="[defaultClass, options.player1 === 'cpuEasy' ? activeClass : '']"
      v-on:click="selectPlayer1('cpuEasy')"
    >CPU Easy</button>
    <button
      class="opt"
      v-bind:class="[defaultClass, options.player1 === 'cpuHard' ? activeClass : '']"
    >CPU Hard</button>
    <p class="mt-4 mb-4 is-size-4">Player 2:</p>
    <button
      class="opt"
      v-bind:class="[defaultClass, options.player2 === 'human' ? activeClass : '']"
      v-on:click="selectPlayer2('human')"
    >Human</button>
    <button
      class="opt"
      v-bind:class="[defaultClass, options.player2 === 'cpuEasy' ? activeClass : '']"
      v-on:click="selectPlayer2('cpuEasy')"
    >CPU Easy</button>
    <button
      class="opt"
      v-bind:class="[defaultClass, options.player2 === 'cpuHard' ? activeClass : '']"
    >CPU Hard</button>
    <p class="mb-4"></p>
    <h1 class="title">{{ options.player1 }} vs {{ options.player2 }}</h1>
    <p class="mb-4"></p>
  </div>
</template>

<script>
export default {
  computed: {
    getPlayerOne() {
      return this.$store.state.ticTacToeGame.playerOne.player;
    },
    getPlayerTwo() {
      return this.$store.state.ticTacToeGame.playerTwo.player;
    }
  },
  data() {
    return {
      defaultClass: "button is-dark",
      activeClass: "is-primary is-active",
      options: {
        player1: "",
        player2: ""
      }
    };
  },
  created() {
    this.options.player1 = this.getPlayerOne;
    this.options.player2 = this.getPlayerTwo;
  },
  methods: {
    selectPlayer1(option) {
      this.options.player1 = option;
      this.$store.commit("updatePlayerOne", this.options.player1);
    },
    selectPlayer2(option) {
      this.options.player2 = option;
      this.$store.commit("updatePlayerTwo", this.options.player2);
    },
    startGame() {
      console.log("startGame selected with the following options:");
      console.log(this.options);
    }
  }
};
</script>

<style scoped>
.opt {
  margin: 0 0.5rem;
}
</style>

