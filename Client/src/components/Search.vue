<template>
  <div class="card notification is-info">
    <div class="card-content">
      <div class="field">
        <label class="label has-text-white">Name: {{ test }}</label>
        <div class="control">
          <input class="input" v-model="test" type="text" @keyup.enter="sendRequest" />
        </div>
        <button v-on:click="sendRequest" class="button is-link mt-2">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: ""
    };
  },
  methods: {
    sendRequest() {
      this.$emit("search-string", this.test);
    }
  }
};
</script>

<style scoped>
.button {
  transition: all 0.4s;
}
</style>