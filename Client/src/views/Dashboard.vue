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
    <div class="tile is-child notification is-danger">
      <p class="title">Test</p>
      <button @click="printUser">Print user</button>
      <button @click="testJWT">TEST JWT</button>
    </div>
    

  </div>
  <div class="tile is-8 is-parent">
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
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Settings,
    Chat
  },
  data() {
    return {
      socket: null,
      list: "hi",
      message: 'Jabadabbadoo',
      messages: []
    };
  },


  computed: {
    ...mapGetters("user", ["user"])
  },
  methods: {
    ...mapActions("user", ["testJWT", 'enableChat']),
    printUser() {
      console.log(this.user);
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