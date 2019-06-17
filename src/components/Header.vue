<template>
  <div>
    <div v-if="isLogin()">
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
              <i class="fas fa-2x fa-ship"></i>Home
            </router-link>
            <router-link class="navbar-item" to="/passengers">
              <i class="fas fa-2x fa-users"></i>Passengers
            </router-link>
            <router-link class="navbar-item" to="/luggage">
              <i class="fas fa-2x fa-luggage-cart"></i>Luggage
            </router-link>
            <router-link class="navbar-item" to="/deck">
              <i class="fas fa-2x fa-layer-group"></i>Deck
            </router-link>
            <router-link class="navbar-item" to="/confiscated_items">
              <i class="fas fa-2x fa-exclamation"></i> Confiscated Items
            </router-link>
            <router-link class="navbar-item" to="/meeting_points">
              <i class="fas fa-2x fa-street-view"></i>Meeting points
            </router-link>
            <!-- nav-start -->
          </div>
          <div class="navbar-end">
            
            <button class="button is-dark" @click="logOut">
              <b-icon pack="fas" icon="arrow-circle-down"></b-icon>
              <span>Log out</span>
            </button>
          </div>

          <!-- nav end -->
        </div>
      </nav>
    </div>
  </div>
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
    },
    isLogin() {
      const loggedIn = localStorage.getItem("user");
      return loggedIn;
    },
    logOut() {
      localStorage.removeItem("user");
      this.$router.push("Home");
      location.reload();
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
