<template>
  <div class="hero-body">
    <div class="container">
      <h1 class="title">Dashboard</h1>
      <p class="subtitle">Welcome to the dashboard {{ username }}</p>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    username: state => state.user.user
  })
};
</script>