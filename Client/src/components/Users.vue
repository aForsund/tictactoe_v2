
<template>
  <div>
    <h1 class="title">Online Users</h1>
    <div v-if="socket">
    <Player v-for="(user, index) in socket.users" :key="index" :player="user" />
    </div>
  </div>
</template>

<script>

import Player from '@/components/Player.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Player
  },
  computed: mapGetters('user', ['socket'])
}

</script>