<template>
  <div class="buttons has-addons">
    <button class="button is-info" :class="{ 'is-success': notification.challenge }" @click="clickNotification(notification)">
      <span v-if="notification.challenge">Challenged by {{ notification.challenger }}</span>
      <span v-else-if="notification.sentChallenge">{{ notification.accepted ? `Challenge vs ${notification.receiver} accepted` : `Challenge sent to ${notification.receiver}` }}</span>
    </button>
    <button class="button is-danger " @click="dismiss(notification)">X</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    notification: [Object]
  },
  data() {
    return {
      expanded: false,
      challenge: null
    }
  },
  methods: {
    ...mapActions('user', ['accept', 'dismiss']),
    expand() {
      this.expanded ? this.expanded = false : this.expanded = true;
    },
    clickNotification(notification) {
      if (notification.challenge) this.accept(notification);
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