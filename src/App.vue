<template>
  <div id="app">
    <router-view/>
    <my-dialog></my-dialog>
  </div>
</template>

<script>
import MyDialog from './views/Dialog.vue'

export default {
  data() {
    return {
    }
  },
  components: {
    MyDialog,
  },
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
