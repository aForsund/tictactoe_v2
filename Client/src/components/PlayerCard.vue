<template>
  <div class="card notification is-info">
    <div class="card-content">
      <h1 class="title">Player Card</h1>
      <p class="is-size-5">
        Name:
        <span>{{ player.username ? player.username : player }}</span>
      </p>

      <p class="is-size-5">
        Games played:
        <span>{{ player.gamesPlayed ? player.gamesPlayed : 'N/A' }}</span>
      </p>
      <p class="is-size-5">
        ELO:
        <span>{{ player.rating ? player.rating : 'N/A' }}</span>
      </p>
      <footer class="card-footer">
        <button class="button is-link mt-2">Challenge</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: [Object, String, Array]
  }
};
</script>

<style scoped>
.button {
  transition: all 0.4s;
}
.card {
  margin-top: 0.75rem;
}
</style>