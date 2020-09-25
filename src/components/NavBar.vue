<template>
  <nav class="navbar is-dark is-unselectable" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item">
          <p class="has-text-weight-bold is-size-4 has-text-primary is-absolute">Tic Tac Toe</p>
        </span>
        <div
          class="navbar-burger"
          data-target="navMenu"
          aria-label="menu"
          aria-expanded="false"
          @click="clickBurger"
          v-bind:class="{ 'is-active': getNavStatus }"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" id="navMenu" :class="{ 'is-active': getNavStatus }">
        <div class="navbar-end" @click="disableNav">
          <router-link class="navbar-item" :to="{ name: 'about' }" @click="disableNav">About</router-link>

          <router-link class="navbar-item" :to="{ name: 'game' }" @click="disableNav">Local Game</router-link>

          <router-link class="navbar-item" :to="{ name: 'rankings' }" @click="disableNav">Rankings</router-link>

          <span class="navbar-item">
            <router-link class="button is-primary" :to="{ name: 'register' }" @click="disableNav">
              <strong>Register</strong>
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    getNavStatus() {
      return this.$store.state.showNav;
    }
  },
  data() {
    return {
      showNav: false,
      navStatus: {
        burgerOpen: false
      }
    };
  },
  methods: {
    clickBurger() {
      this.$store.commit("clickNav");
    },
    disableNav() {
      this.$store.commit("clickLink");
    }
  }
};
</script>

<style scoped>
.navbar-menu.is-active {
  position: absolute;
  width: 100%;
}

.nav {
  background-color: transparent;
}
.button {
  transition: all 0.4s;
}
</style>
