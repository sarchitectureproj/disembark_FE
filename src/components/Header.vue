<template>
  <nav class="navbar is-twitter" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <button
        @click="makeBurger"
        class="button navbar-burger is-info"
        data-target="navMenu"
        v-bind:class="{ 'is-active': activator }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div id="navMenu" class="navbar-menu" v-bind:class="{ 'is-active': activator }">
      <div class="navbar-start">
        <a class="navbar-item"></a>
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/passagners">Passagners</router-link>
        <router-link class="navbar-item" to="/luggage">Luggage</router-link>
        <router-link class="navbar-item" to="/deck">Deck</router-link>
        <router-link class="navbar-item" to="/citems">Confiscated Items</router-link>

        <!-- nav-start -->
      </div>
      <!-- nav end -->
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      msg: "",
      activator: false
    };
  },
  methods: {
    makeBurger() {
      this.activator = !this.activator;
      return this.activator;
    }
  }
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; 
}
*/
</style>
