<template>
  <section id="app" class="hero is-dark is-fullheight is-bold">
    <div class="hero-head">
      <NavBar />
    </div>
    <div class="hero-body">
      <router-view />
    </div>
    <div class="hero-foot has-text-right">
      <span>
        <a href="https://bulma.io">
          <img
            src="https://bulma.io/images/made-with-bulma--white.png"
            alt="Made with Bulma"
            width="128"
            height="24"
          />
        </a>
      </span>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import NavBar from "@/components/NavBar.vue";

//import Notification from "@/components/Notification.vue";

export default {
  data() {
    return {
      userString: null,

    }
  },
  components: {
    NavBar
  },
  methods: {
		...mapActions('user', ['setUser', 'logOut', 'testJWT'])
	},
	created() {
    
    this.userString = localStorage.getItem('user');
		if (this.userString) {
			console.log('userString', this.userString);
			
      this.setUser(JSON.parse(this.userString));
      this.testJWT();
    }
    
  },
	
	
};

</script>

<style lang="scss">
@import "~bulma/css/bulma.css";
body::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}
body::-webkit-scrollbar-track {
  background: hsl(0, 0%, 21%);        /* color of the tracking area */
}
body::-webkit-scrollbar-thumb {
  background-color: #8c67ef;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid hsl(0, 0%, 21%);  /* creates padding around scroll thumb */
}


  

</style>
