<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
//import axios from "axios";
import Header from "./components/Header.vue";

// Vue.use(Buefy)
export default {
  name: "app",
  components: {
    Header
  },
};
</script>

<style lang="scss">
//typografy
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700');
$family-sans-serif: "Nunito", sans-serif;
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8CBCE6;
$primary-invert: findColorInvert($primary);
$twitter: #1b7f79;
$twitter-invert: findColorInvert($twitter);
$blue: #1469B3;
$blue-invert: findColorInvert($blue);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  ),
  "blue": (
    $blue,
    $blue-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>
