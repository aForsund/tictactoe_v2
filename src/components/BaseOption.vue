<template>
  <div>
    <button value="msg" class="button is-primary" v-on:click="updateChoices" >
      TESTBUTTON {{ option }}
      
    </button>
  </div>
</template>


<script>
export default {
  props: {
    isActive: false
  }
  data() {
    return {
      option: 'option'
    }
  }
  model: {
    prop: 'selected',
    event: 'onSelected'
  },
  methods: {
    updateChoices() {
      this.option = event.target.value
      this.$emit("buttonPressed", this.option);
    }
  },
  
}
</script>