<template>
  <div class="card">
    <div class="card-content">
      <div class="field">
        <label class="label">Name: {{ test }}</label>
        <div class="control">
          <input class="input" v-model="test" type="text" @keyup.enter="sendRequest" />
        </div>
        <button v-on:click="sendRequest" class="button is-primary">Search</button>
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