<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title">Player Card</h1>
      <h2 class="subtitle has-text-dark">
        Name:
        <span>{{ player.username ? player.username : player }}</span>
      </h2>
      <h2 class="subtitle has-text-dark">
        Games played:
        <span>{{ player.gamesPlayed ? player.gamesPlayed : 'N/A' }}</span>
      </h2>
      <h2 class="subtitle has-text-dark">
        ELO:
        <span>{{ player.rating ? player.rating : 'N/A' }}</span>
      </h2>
      <footer class="card-footer">
        <button class="button is-primary">Challenge</button>
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
