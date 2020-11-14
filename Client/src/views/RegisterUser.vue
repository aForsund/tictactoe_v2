<template>
  <div class="hero-body">
    <div class="container">
      <h1 class="title">Register User</h1>
      <h2 class="subtitle">Authorization is not yet implemented</h2>
      <div class="columns is-mobile">
        <div
          class="column is-three-quarters-mobile is-half-tablet is-one-third-widescreen"
        >
          <p class="subtitle">
            You can add users to the database and search for them in the
            rankings section
          </p>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="text"
                placeholder="Username"
                v-model="name"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-snowboarding"></i>
              </span>
              <span v-if="name !== ''" class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="password"
                placeholder="Password"
                v-model="password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
              <span v-if="password !== ''" class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-success" @click="verifyRequest">
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API_interface from "@/services/API-interface.js";

export default {
  data() {
    return {
      data: {
        name: "",
        email: "",
        password: "",
        connection: null
      },
      name: "",
      password: "",
      email: ""
    };
  },
  created: {},
  methods: {
    verifyRequest() {
      if (this.name === "" && this.password === "") {
        this.alertUsername();
        this.alertPassword();
        return;
      } else if (this.name === "" && this.password !== "") {
        this.alertUsername();
        return;
      } else if (this.password === "" && this.name !== "") {
        this.alertPassword();
        return;
      } else {
        this.data.name = this.name;
        this.data.password = this.password;
        this.register(this.data);
      }
    },
    clearData() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.data.name = "";
      this.data.email = "";
      this.data.password = "";
    },

    alertUsername() {
      console.log("alert username...");
    },
    alertPassword() {
      console.log("alert password");
    },
    register() {
      API_interface.registerUser(this.data)
        .then(response => {
          console.log(response);
          this.clearData();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.button {
  transition: all 0.4s;
}
</style>
