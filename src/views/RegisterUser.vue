<template>
  <div class="container">
    <h1 class="title">Register User</h1>
    <h2
      class="subtitle"
    >Authorization is not yet implemented. You can add users to database and search for them in the rankings section</h2>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Username" v-model="name" />
        <span class="icon is-small is-left">
          <i class="fas fa-snowboarding"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password" v-model="password" />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-success" @click="verifyRequest">Register</button>
      </p>
    </div>

    <button class="button is-primary">Search</button>
    <label class="label">Name: {{ name }}</label>
    <div class="control">
      <input class="input" v-model="name" type="text" name="name" value />
    </div>
    <label class="email">Email</label>

    <div class="control">
      <input v-model="email" type="email" name="email" value />
    </div>
    <label for="password">Password:</label>
    <input v-model="password" type="password" name="password" value />

    <button class="control is-primary" type="submit" name="button">Register</button>
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
        password: ""
      },
      name: "",
      password: "",
      email: ""
    };
  },
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
    async register() {
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
<!--
<div class="field">
  <p class="control has-icons-left">
    <input class="input" type="password" placeholder="Password">
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
  </p>
</div>


<div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input class="input" type="text" placeholder="Text input">
  </div>
</div>

<div class="field">
  <label class="label">Username</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="Text input" value="bulma">
    <span class="icon is-small is-left">
      <i class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
  <p class="help is-success">This username is available</p>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input class="input is-danger" type="email" placeholder="Email input" value="hello@">
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
  </div>
  <p class="help is-danger">This email is invalid</p>
</div>

<div class="field">
  <label class="label">Subject</label>
  <div class="control">
    <div class="select">
      <select>
        <option>Select dropdown</option>
        <option>With options</option>
      </select>
    </div>
  </div>
</div>

<div class="field">
  <label class="label">Message</label>
  <div class="control">
    <textarea class="textarea" placeholder="Textarea"></textarea>
  </div>
</div>

<div class="field">
  <div class="control">
    <label class="checkbox">
      <input type="checkbox">
      I agree to the <a href="#">terms and conditions</a>
    </label>
  </div>
</div>

<div class="field">
  <div class="control">
    <label class="radio">
      <input type="radio" name="question">
      Yes
    </label>
    <label class="radio">
      <input type="radio" name="question">
      No
    </label>
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-link">Submit</button>
  </div>
  <div class="control">
    <button class="button is-link is-light">Cancel</button>
  </div>
</div>

-->
