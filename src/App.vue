<template>
  <div id="app">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
    Menu, Login, Register
  }
}
</script>

<style>

#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>
