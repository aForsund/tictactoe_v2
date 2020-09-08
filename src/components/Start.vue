<template>
  <div class="hero">
    <div class="container">
      <button v-on:click="startGame" class="button is-large is-info">Start Game</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      this.$store.commit("startGame");
    }
  }
};
</script>