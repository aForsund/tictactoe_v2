<template>
<div>
        <p class="title">Chat</p>
            
                
      <div v-if="activeChat">
         
          <div class="chat notification has-background-grey-dark">
      <div class="block" v-for="(message, index) in socket.chat" :key="index">
        <div class="has-background-primary has-text-white is-medium m-2">
        <span class="has-text-weight-semibold">{{ 10 > message.hour ? `0${message.hour}` : message.hour }}:{{ 10 > message.minute ? `0${message.minute}` : message.minute }} {{ message.username}}: {{" "}}</span>  
        <span> {{ message.text}} </span>
        <span /><span />
        
        </div>
      </div>
      
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