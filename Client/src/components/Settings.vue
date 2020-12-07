<template>
    <div>
        <h1 class="title">Settings</h1>
        <div><b-switch :left-label="true" @input="changeOnlineStatus" :value="online" :disabled="loggedIn ? false : true">You are {{ online ? 'online' : 'offline'}}</b-switch></div>
        <div><b-switch :left-label="true" @input="changeChatStatus" :value="activeChat" :disabled="online ? false : true">{{ activeChat ? 'Disable Chat' : 'Enable Chat'}}</b-switch></div>
         
         
                  
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters("user", ["loggedIn", "online", "messages", "activeChat"]),
    },
    methods: {
        ...mapActions("user", ["enableOnline", "disableOnline", "joinChat", "leaveChat"]),
        changeOnlineStatus() {
            this.online ? this.disableOnline() : this.enableOnline();
        },
        changeChatStatus() {
            this.activeChat ? this.leaveChat() : this.joinChat();
        }
    },

}
</script>