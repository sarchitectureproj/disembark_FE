<template>
  <section class="hero is-fullheight  is-bold">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <article class="card is-rounded">
            <div class="card-content">
              <h1 class="title">Crew Login</h1>
              <b-field label="Username">
                <b-input placeholder="Username.." icon="account" size="is-medium"></b-input>
              </b-field>
              <p class="control has-icon">
                <b-field label="Password">
                  <b-input
                    type="password"
                    size="is-medium"
                    placeholder="Password"
                    icon-pack="fas"
                    icon="key"
                    password-reveal
                  ></b-input>
                </b-field>
              </p>
            </div>
            <footer class="card-footer">
              <b-button @click="clickMe" size="is-large" type="is-blue" class="is-fullwidth">
                <i class="fa fa-sign-in-alt"></i>
                Login
              </b-button>
            </footer>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "login"
};
</script>
<style lang="sass" scoped>;
</style>

