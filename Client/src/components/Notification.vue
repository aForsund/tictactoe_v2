<template>
  <div class="tags has-addons">
      <span class="tag is-info">{{ notification.challenge ? 'Challenged by' : 'No info yet..'}} - {{ notification.username }}</span>
      <span v-if="notification.sentChallenge" class="tag is-info" :class="{ 'is-warning' : notification.accepted}" @click="clickNotification(notification)">{{ notification.accepted ? 'challenge accepted' : 'challenge sent'}}</span>
      <span v-else class="tag is-success" @click="clickNotification(notification)"></span>
      <a class="tag is-danger is-delete" @click="dismiss(notification)"></a>
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
    ...mapActions('user', ['accept', 'dismiss', 'joinGame']),
    expand() {
      this.expanded ? this.expanded = false : this.expanded = true;
    },
    clickNotification(notification) {
      if (notification.challenge) this.accept(notification);
      else if (notification.accepted) this.joinGame(notification);
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