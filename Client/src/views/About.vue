<template>
  <div class="container">
    <h1 class="title">Tic Tac Toe</h1>

    <div class="columns variable">
      <div class="column is-8">
        <div class="notification is-dark ">
          <h3 class="subtitle">About</h3>
          <p>
            This is a demo project of a tic tac toe game, with computer vs
            computer mode.
          </p>
          <p>
            This app is built with vue.js and styled with Bulma CSS framework.
            App is served by express with API interface and mongoDB.
          </p>
          <p>
            This project is under development and will be updated once
            authorization on the server API and client script is implemented.
            See future updates for more info.
          </p>

          <a
            class="button is-primary"
            href="https://github.com/aForsund/tictactoe"
            >GitHub repository</a
          >
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
          </ul>
        </div>
      </div>

      <div class="column is-4">
        <div class="notification is-dark content">
          <h4 class="subtitle">Back end</h4>
          <ul>
            <li>Node.js + Express</li>
            <li>Express passport and JWT*</li>
            <li>mongoDB</li>
          </ul>
          <p class="has-text-right is-size-7">* not yet implemented</p>
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
            <li>Use minmax algorithm to select computer difficulty</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  transition: all 0.4s;
}
</style>