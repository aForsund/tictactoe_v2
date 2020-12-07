<template>
  <div class="container">
    
      <div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child notification is-info">
      <p class="title">Details</p>
      <p>Player Name: <span v-if="user">{{ user.name }}</span></p>
      <p>Games Played</p>
      <p>ELO rating</p>
      <p>Last Results</p>
    </div>
    <div class="tile is-child notification is-dark">
      <Settings />
    </div>
    <div v-if="online" class="title is-child notification is-info">
      <Users />
    </div>
    <div class="title is-child notification is-dark">
      <Notifications />
    </div>
    <div class="tile is-child notification is-danger">
      <p class="title">Test</p>
      <button @click="printUser">Print user</button>
      <button @click="printUsers">Print users</button>
      <button @click="testJWT">TEST JWT</button>
      <button @click="printNotifications">Print notifications</button>
      <div v-if="socket">
      <p v-for="(user, index) in socket.users" :key="index">{{ index }}: {{ user.username }}</p>
      </div>
    </div>
    

  </div>
  <div v-if="activeChat" class="tile is-8 is-parent">
    <div class="tile is-child notification is-dark">
      
      <Chat />
      
    </div>
    


    </div>

  
</div>
  </div>
 
</template>

<script>

import Settings from "@/components/Settings.vue";
import Chat from '@/components/Chat.vue';
import Users from '@/components/Users.vue';
import Notifications from '@/components/Notifications.vue';

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Settings,
    Chat,
    Users,
    Notifications
  },
  computed: {
    ...mapGetters("user", ["user", "users", "socket", "activeChat", "online"])
  },
  methods: {
    ...mapActions("user", ["testJWT", 'enableChat']),
    printUser() {
      console.log(this.user);
    },
    printUsers() {
      console.log(this.socket.users);
    },
    printNotifications() {
      console.log(this.socket.notifications);
    }
  }
};
</script>

<style scoped>


.chatmessage {
  margin: auto;
  overflow-wrap: normal;
}
.enable-line-break {
  white-space: pre-wrap;
}

</style>