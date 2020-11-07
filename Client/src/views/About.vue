<template>
  <div class="container">
    <h1 class="title">Tic Tac Toe</h1>

    <div class="columns is-variable is-multiline is-3">
      <div class="column is-8">
        <div class="notification is-dark content">
          <h3 class="subtitle">About</h3>
          <p>
            This is a demo project of a tic tac toe game, with computer vs
            computer mode.
          </p>
          <p>
            This app is built with Vue.js and Buefy component library, and
            styled with Bulma CSS framework. App is served by express with API
            interface and mongoDB.
          </p>
          <p>Please visit the GitHub repository to view the source code.</p>
          <p v-if="!loggedIn">
            Please log in or create an account to see the functionality of this
            project.
          </p>

          <div class="mt-4">
            <a
              class="button is-primary"
              href="https://github.com/aForsund/tictactoe_v2"
              >GitHub repository</a
            >
            <button
              v-if="!loggedIn"
              class="button is-primary login"
              @click="openModal"
            >
              <strong>Log In</strong>
            </button>
          </div>
        </div>
      </div>
      <div class="column is-dark is-4">
        <div class="notification is-dark content">
          <h4 class="subtitle">Front end</h4>
          <ul>
            <li>Vue.js and Vuex</li>
            <li>JavaScript game logic</li>
            <li>axios</li>
            <li>Bulma CSS framework</li>
            <li>Buefy interface library</li>
          </ul>
        </div>
      </div>

      <div class="column is-4">
        <div class="notification is-dark content">
          <h4 class="subtitle">Back end</h4>
          <ul>
            <li>Node.js + Express</li>
            <li>Express passport with JWT</li>
            <li>mongoDB</li>
          </ul>
        </div>
      </div>
      <div class="column is-8">
        <div class="notification is-dark content">
          <h3 class="subtitle">Future Updates</h3>
          <ul>
            <li>Login system with JWT to authenticate users</li>
            <li>Multiplayer mode with rank system</li>
            <li>
              Use magic square to decide if a game is a draw before the 9th mark
              is placed on the board, e.g draw game if no possible win condition
            </li>
            <li>Use minimax algorithm to select computer difficulty</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: mapGetters("user", ["loggedIn"]),
  methods: mapActions("user", ["openModal"])
};
</script>
<style scoped>
.button {
  transition: all 0.4s;
}
.login {
  margin: 0 0.5rem;
}
</style>