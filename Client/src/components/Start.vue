<template>
  <div class="hero">
    <div class="container">
      <button v-on:click="startGame" class="button mt-4 is-medium is-primary">
        Start Game
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      this.$store.commit("START_GAME");
    }
  }
};
</script>