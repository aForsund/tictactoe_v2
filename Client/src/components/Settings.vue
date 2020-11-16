<template>
    <div>
        <h1 class="title">Settings</h1>
        <b-switch :left-label="true" @input="changeStatus" :value="online" :disabled="loggedIn ? false : true">You are {{ online ? 'online' : 'offline'}}</b-switch>
        
         
         
                  
        
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
        ...mapGetters("user", ["loggedIn", "online", "messages"]),
    },
    methods: {
        ...mapActions("user", ["enableOnline", "disableOnline"]),
        changeStatus() {
            this.online ? this.disableOnline() : this.enableOnline();
        }
    },

}
</script>