<template>
  <div class="container has-text-centered">
    <h1 class="title">Please select options</h1>

    <p class="mb-4 is-size-4">
      Player one:
      {{ playerOne.cpu ? `CPU #${playerOne.difficulty}` : "Local Player" }}
    </p>
    <div class="columns is-centered is-vcentered">
      <div class="column is-narrow">
        <div class="player-select">
          <b-switch
            :value="playerOne.cpu"
            type="is-success"
            passive-type="is-primary"
            v-model="playerOne.cpu"
          >
            CPU
          </b-switch>
        </div>
      </div>

      <div class="column is-narrow slider">
        <b-field>
          <b-slider
            size="is-medium"
            :type="playerOne.cpu ? 'is-success' : 'is-primary'"
            :min="0"
            :max="3"
            :value="playerOne.difficulty"
            v-model="playerOne.difficulty"
            :tooltip="false"
            @dragging="playerOne.cpu = true"
          ></b-slider>
        </b-field>
      </div>
    </div>

    <p class="mt-4 mb-4 is-size-4">
      Player two:
      {{ playerTwo.cpu ? `CPU #${playerTwo.difficulty}` : "Local Player" }}
    </p>

    <div class="columns is-centered is-vcentered">
      <div class="column is-narrow">
        <div class="player-select">
          <b-switch
            :value="playerTwo.cpu"
            type="is-success"
            passive-type="is-primary"
            v-model="playerTwo.cpu"
          >
            CPU
          </b-switch>
        </div>
      </div>

      <div class="column is-narrow slider">
        <b-slider
          size="is-medium"
          :type="playerTwo.cpu ? 'is-success' : 'is-primary'"
          :min="0"
          :max="3"
          :value="playerTwo.difficulty"
          v-model="playerTwo.difficulty"
          :tooltip="false"
          @dragging="playerTwo.cpu = true"
        ></b-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      playerOne: state => state.localGameOptions.playerOne,
      playerTwo: state => state.localGameOptions.playerTwo
    })
  }
};
</script>

<style scoped>
.opt {
  margin: 0 0.5rem;
}
.options {
  max-width: 320px;
}
.slider {
  width: 130px;
}
.player-select {
  width: 150px;
}
</style>

