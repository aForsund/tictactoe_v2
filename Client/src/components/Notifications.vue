<template>
    <div>
        <h1 class="title">Notifications</h1>
        <div v-if="socket">
            <Notification v-for="(notification, index) in socket.notifications" :key="index" :notification="notification" />
        </div>
        
    </div>
</template>

<script>
import Notification from '@/components/Notification.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        Notification
    },
    computed: {
        ...mapGetters("user", ["socket"]),
    },
    methods: {
        ...mapActions("user", ["enableOnline", "disableOnline", "joinChat", "leaveChat"]),
    },

}
</script>