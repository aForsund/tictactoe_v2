<template>
  <div class="tags has-addons">
      <span class="tag is-info">{{ notification.challenge ? 'Challenged by' : 'No info yet..'}} - {{ notification.username }}</span>
      <span class="tag is-success" @click="accept(notification)">Accept</span>
      <a class="tag is-danger is-delete" @click="dismiss(notification)"></a>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    notification: [Object, String, Array]
  },
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    ...mapActions('user', ['accept', 'dismiss']),
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