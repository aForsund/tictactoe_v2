<template>
  <div>
    <div class="mt-1 mb-1" @click="expand">
      <button class="button is-small is-primary">{{ player.username ? player.username : player }}</button>
    </div>
    <div class="mt-1 mb-1" v-if="expanded">
      <button class="button is-small is-primary">Message</button>
      <button class="button is-small is-primary ml-1 mr-1" @click="challenge(player)">Challenge</button>
      <button class="button is-small is-danger">View Card</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    player: [Object, String, Array]
  },
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    ...mapActions('user', ['challenge', 'user']),
    expand() {
      this.expanded ? this.expanded = false : this.expanded = true;
    }
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