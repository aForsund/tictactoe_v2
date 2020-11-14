<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ login ? "Login" : "Register" }}
      </p>
      <button type="button" class="delete" @click="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
      <b-field label="Username">
        <b-input :value="name" placeholder="Your username" required> </b-input>
      </b-field>
      <b-field label="Password">
        <b-input
          type="password"
          :value="password"
          password-reveal
          placeholder="Your password"
          required
        >
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
          <span v-if="password !== ''" class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </b-input>
      </b-field>
      <b-checkbox>Remember me/Accept cookie policy</b-checkbox>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">
        Close
      </button>
      <button class="button is-primary" type="button" @click="test">
        {{ login ? "Login" : "Register" }}
      </button>
      <button class="button is-primary" type="button" @click="login = !login">
        {{
          login
            ? "Not registered? Please register"
            : "Already got an account? Please log in"
        }}
      </button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      login: true,
      name: "",
      password: "",
      data: {
        name: "h",
        password: "h"
      }
    };
  },
  computed: {
    ...mapGetters("user", ["modalActive"])
  },
  methods: {
    //...mapActions("user", ["logIn"]),
    verifyRequest() {
      if (this.name === "" && this.password === "") {
        return;
      } else if (this.name === "" && this.password !== "") {
        return;
      } else if (this.password === "" && this.name !== "") {
        return;
      } else {
        this.data.name = this.name;
        this.data.password = this.password;
        console.log("data added");
        this.logIn(this.data);
        this.$emit("close");
      }
    },
    test() {
      this.$emit("logIn", this.data);
    }
  }
};
</script>