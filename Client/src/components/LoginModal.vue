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
        <b-input v-model="name" placeholder="Your username" required>
        </b-input> 
      </b-field>
      <b-field label="Password">
        <b-input
          type="password"
          v-model="password"
          password-reveal
          placeholder="Your password"
          required
        >
        </b-input>
      </b-field>
      <b-checkbox v-if="!login" v-model="terms">By registering you accept that this app saves data to localstorage</b-checkbox>
        
      
    </section>
    <footer class="modal-card-foot">
      <button class="button is-primary" type="button" @click="verifyRequest">
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
      terms: false,
      data: {
        name: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["modalActive", "loggedIn"])
  },
  methods: {
    //...mapActions("user", ["logIn"]),
    verifyRequest() {
      if (!this.login && !this.terms) {
        console.log('Please accept terms to register an account');
        return;
      }
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
        this.login ? this.emitLogin(this.data) : this.emitRegister(this.data);
  
      }
    },
    emitLogin() {
      this.$emit("logIn", this.data);
    },
    emitRegister() {
      this.$emit('register', this.data);
    }
  },
  
};
</script>