<template>
  <div id="app">
    <Header/>
    <!-- <HelloWorld msg="This is a prop"/> -->
   
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'

// Vue.use(Buefy)
export default {
  name: 'app',
  components: {
    HelloWorld,
    Header
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
