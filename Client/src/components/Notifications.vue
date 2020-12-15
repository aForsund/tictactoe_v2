<template>
    <div>
      <div class="has-text-right is-clipped"></div>
        <h1 class="title">Notifications<i class="fas fa-angle-down is-pulled-right"></i></h1>
        
        <div v-if="socket">
            <Notification v-for="(notification, index) in socket.notifications" :key="index" :notification="notification" />
        </div>
        
    </div>
</template>

<script>
import Notification from '@/components/Notification.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        Notification
    },
    computed: {
        ...mapGetters("user", ["socket"]),
    },
    

}
</script>