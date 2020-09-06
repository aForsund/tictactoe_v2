<template>
  <div class="hero">
    <div class="container">
      <button v-on:click="startGame" class="button is-info">This is the start game button</button>
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