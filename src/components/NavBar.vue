<template>
  <nav class="navbar is-primary is-unselectable" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <span class="navbar-item">
          <p class="has-text-weight-bold is-size-4 has-text-primary">Tic Tac Toe</p>
        </span>
        <span
          class="navbar-burger burger"
          data-target="navbarMenuHeroC"
          aria-label="menu"
          aria-expanded="false"
          @click="isOpen = !isOpen"
          v-bind:class="{'is-active': isOpen}"
        >
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenuHeroC" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
        <div class="navbar-end">
          <router-link class="navbar-item" :to="{ name: 'home' }">Home</router-link>
          <router-link class="navbar-item" :to="{ name: 'about' }">About</router-link>
          <router-link class="navbar-item" :to="{ name: 'game' }">Local Game</router-link>
          <router-link class="navbar-item" :to="{ name: 'rankings' }">Rankings</router-link>
          <span class="navbar-item">
            <router-link class="button is-success" :to="{ name: 'register' }">Register</router-link>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>






<script>
export default {
  data() {
    return {
      isOpen: false
    };
  }
};
</script>

<style scoped>
.navbar-menu.is-active {
  position: absolute;
  width: 100%;
}
</style>
