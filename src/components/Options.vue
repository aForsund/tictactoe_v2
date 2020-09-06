<template>
  <div>
    <div class="container">
      <h1 class="title">Please select options</h1>
      <p>Player 1:</p>
      <button
        v-bind:class="[defaultClass, options.player1 === 'human' ? activeClass : '']"
        v-on:click="selectPlayer1('human')"
      >Human</button>
      <button
        v-bind:class="[defaultClass, options.player1 === 'cpuEasy' ? activeClass : '']"
        v-on:click="selectPlayer1('cpuEasy')"
      >CPU Easy</button>
      <button
        v-bind:class="[defaultClass, options.player1 === 'cpuHard' ? activeClass : '']"
        v-on:click="selectPlayer1('cpuHard')"
      >CPU Hard</button>
      <p>Player 2:</p>
      <button
        v-bind:class="[defaultClass, options.player2 === 'human' ? activeClass : '']"
        v-on:click="selectPlayer2('human')"
      >Human</button>
      <button
        v-bind:class="[defaultClass, options.player2 === 'cpuEasy' ? activeClass : '']"
        v-on:click="selectPlayer2('cpuEasy')"
      >CPU Easy</button>
      <button
        v-bind:class="[defaultClass, options.player2 === 'cpuHard' ? activeClass : '']"
        v-on:click="selectPlayer2('cpuHard')"
      >CPU Hard</button>

      <p>Options are: {{ options.player1 }}, {{ options.player2 }}</p>

      <button class="button is-danger" v-on:click="startGame">Start Game</button>
    </div>
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
      defaultClass: "button is-primary",
      activeClass: "is-active",
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

