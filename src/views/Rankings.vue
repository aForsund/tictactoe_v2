<template>
  <div class="container">
    <h1 class="title">Rankings</h1>
    
    <Search @search-string="search" />
    <PlayerCard v-for="player in playerList" :key="player._id" :player="player" />
  </div>
</template>

<script>
import PlayerCard from "@/components/PlayerCard.vue";
import Search from "@/components/Search.vue";
import API_interface from "@/services/API-interface.js";

export default {
  components: {
    PlayerCard,
    Search
  },
  computed: {
    searchArray() {
      return this.$store.state.searchArray;
    }
  },
  data() {
    return {
      playerList: []
    };
  },
  created() {
    if (this.searchArray.length === 0 || this.searchArray === undefined) {
      API_interface.getUsers()
        .then(response => (this.playerList = response.data))
        .catch(err => console.log(err));
    } else {
      this.playerList = this.searchArray;
    }
  },
  methods: {
    async search(string) {
      //this.playerList = string;

      console.log("searching for: ", string);
      console.log("store data: ", this.searchArray);
      if (string === "") {
        API_interface.getUsers()
          .then(response => {
            this.playerList = response.data;
            this.updateSearchArray();
          })
          .catch(err => console.log(err));
      } else {
        API_interface.search(string)
          .then(response => {
            this.playerList = response.data;
            this.updateSearchArray();
          })
          .catch(err => console.log(err));
      }
    },
    updateSearchArray() {
      console.log("trying to update searchArray store with: ", this.playerList);
      this.$store.commit("rememberSearchResults", this.playerList);
    }
  }
};
</script>
