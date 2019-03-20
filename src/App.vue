<template>
  <div id="app">
    <Menu ref="menu"></Menu>
    <router-view v-on:login="login"></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
    Menu
  },
  data() {
    return {
    }
  },
  methods: {
    login(){
      this.$refs.menu.log = true;
    }
  },
}
</script>

<style>

#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    color: #333;
    background-color: #eee;
}
</style>
