<template>
  <nav
    class="navbar is-dark is-unselectable"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item">
          <p
            class="has-text-weight-bold is-size-4 has-text-primary is-absolute"
          >
            Tic Tac Toe
          </p>
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
      <div
        class="navbar-menu"
        id="navMenu"
        :class="{ 'is-active': getNavStatus }"
      >
        <div class="navbar-end" @click="disableNav">
          <router-link
            class="navbar-item"
            :to="{ name: 'about' }"
            @click="disableNav"
            >About</router-link
          >

          <router-link
            class="navbar-item"
            :to="{ name: 'game' }"
            @click="disableNav"
            >Local Game</router-link
          >

          <router-link
            v-if="loggedIn"
            class="navbar-item"
            :to="{ name: 'rankings' }"
            @click="disableNav"
            >Rankings</router-link
          >

          <router-link
            v-if="loggedIn"
            class="navbar-item"
            :to="{ name: 'dashboard' }"
            @click="disableNav"
            >Dashboard</router-link>
         
       

          <span class="navbar-item">
            <div v-if="loggedIn" class="button is-primary has-text-weight-semibold" @click="logOut">
              Log Out
            </div>
            <div v-else class="button is-primary has-text-weight-semibold" @click="openModal">
              Log In
            </div>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["loggedIn", "online", "messages"]),
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
    ...mapActions("user", ["openModal", "logOut"]),
    clickBurger() {
      this.$store.commit("CLICK_NAV");
    },
    disableNav() {
      this.$store.commit("CLICK_LINK");
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

.flexcontainer {
  display: flex;
}
</style>
