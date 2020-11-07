<template>
  <div class="hero-body">
    <div class="container">
      <h1 class="title">Log:</h1>
      <p>{{ list }}</p>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      socket: {},
      list: "hi"
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted() {
    this.socket.on("hello", data => {
      console.log(data);
    });
  }
};
</script>