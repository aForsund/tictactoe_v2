<template>
  <div class="hero-body">
    <div class="container">
      <h1 class="title">Log:</h1>
      <p>{{ list }}</p>
      
      <div class="field">
        <label class="label has-text-white">Enter your message...</label>
          <div class="control">
            <input class="input" v-model="message" type="text" @keyup.enter="sendMessage" />
        </div>
        <button @click="sendMessage" class="button is-link mt-2">Send</button>
      </div>
    </div>

    </div>

 
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: null,
      list: "hi",
      message: ''
    };
  },
  created() {
    //Development url
    this.socket = io("http://localhost:3000");
    //Production - no url
    //this.socket = io();
    this.socket.onopen = event => {
      console.log('successfully connected to websocket server...');
      console.log(event);
    };
  },
  mounted() {
    this.socket.on("hello", data => {
      console.log(data);
    });
    this.socket.onmessage = event => {
      console.log('this.socket.onmessage...');
      console.log(event);
    }
  },
  methods: {
    sendMessage() {
      this.socket.send(this.message);
      this.message = '';
    }
  }
};
</script>