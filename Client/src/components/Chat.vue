<template>
<div>
        <p class="title">
            Chat
            <span>
                <b-switch @input="changeStatus" :value="activeChat" size="is-medium" :disabled="online ? false : true"> {{ activeChat ? 'Disable Chat' : 'Enable Chat'}}</b-switch></span></p>
      <div v-if="activeChat">
         
          <div class="chat notification has-background-grey-dark">
      <p v-for="(message, index) in socket.chat" :key="index">
        <span class="tag has-background-primary has-text-white is-medium mb-2">
        <span class="has-text-weight-semibold">{{ 10 > message.hour ? `0${message.hour}` : message.hour }}:{{ 10 > message.minute ? `0${message.minute}` : message.minute }} {{ message.username}}:</span>  
        <span class="pl-2"> {{ message.text}} </span>
        </span>
      </p>
      
      </div>
      
    <div class="field has-addons">
      <button @click="handleMessage" class="control button is-primary">Send</button>
          <input class="control input" v-model="message" type="text" @keyup.enter="handleMessage" />
          </div>
      </div>
      
    
        
        
    </div>
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            message: ''
        }
    },
    computed: mapGetters('user', ['socket', 'activeChat', 'online']),
    methods: {
        ...mapActions('user', ['joinChat', 'leaveChat', 'sendMessage']),
        changeStatus() {
            this.activeChat ? this.leaveChat() : this.joinChat();
        },
        handleMessage() {
            if (this.message === '') return;
            this.sendMessage(this.message);
            this.message = '';
        }
    }
}
</script>

<style scoped>

.chat {
  height: 370px;
  overflow-y: auto;
  
}
.chat::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}
.chat::-webkit-scrollbar-track {
  background: hsl(0, 0%, 21%);        /* color of the tracking area */
}
.chat::-webkit-scrollbar-thumb {
  background-color: #8c67ef;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid hsl(0, 0%, 21%);  /* creates padding around scroll thumb */
}
</style>