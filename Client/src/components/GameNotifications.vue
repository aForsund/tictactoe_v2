<template>
  <div class="notification is-dark has-text-left mb-4">
    <div v-for="(entry, index) in getNotifications" :key="index">
      <p class="is-size-7 is-family-code">{{ entry }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('user', ['gameNotifications']),
    getNotifications() {
      if (this.gameNotifications) return this.gameNotifications.slice(-5);
      else return null;
    }
  }
}
</script>

<style scoped>
.is-family-code {
  color: hsl(171, 100%, 41%)
}
.notification {
  height: 135px;
}
</style>