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
        <router-link class="navbar-item" to="/">
          <i class="fas fa-3x fa-ship"></i>Home
        </router-link>
        <router-link class="navbar-item" to="/passengers">
          <i class="fas fa-3x fa-users"></i>Passengers
        </router-link>
        <router-link class="navbar-item" to="/luggage">
          <i class="fas fa-3x fa-luggage-cart"></i>Luggage
        </router-link>
        <router-link class="navbar-item" to="/deck">
          <i class="fas fa-3x fa-layer-group"></i>Deck
        </router-link>
        <router-link class="navbar-item" to="/citems">
          <i class="fas fa-3x fa-exclamation"></i> Confiscated Items
        </router-link>
        <router-link class="navbar-item" to="/meeting_points">
          <i class="fas fa-3x fa-street-view"></i>Meeting points
        </router-link>

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
