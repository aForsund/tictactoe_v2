<template>
  <div>
      <button class="is-primary" @click="joinGame(instance)">{{ instance }}</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    instance: [Object]
  },
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions('user', ['dismiss', 'joinGame']),
   
 
  }
};
</script>

<style scoped>
.button {
  transition: all 0.4s;
}
</style>