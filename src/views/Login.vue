<template>
  <section class="hero is-fullheight is-bold is-light">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <article class="card is-rounded">
            <div class="card-content">
              <h1 class="title">Crew Login</h1>
              <b-field label="Username">
                <b-input
                  placeholder="Username.."
                  icon="account"
                  size="is-medium"
                  v-model="username"
                  required
                ></b-input>
              </b-field>
              <p class="control has-icon">
                <b-field label="Password">
                  <b-input
                    type="password"
                    v-model="password"
                    size="is-medium"
                    placeholder="Password"
                    icon-pack="fas"
                    icon="key"
                    required
                    password-reveal
                  ></b-input>
                </b-field>
              </p>
            </div>
            <footer class="card-footer">
              <b-button @click="loginRequest" size="is-large" type="is-blue" class="is-fullwidth">
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
import GRAPHQL_URL from "../server";
import axios from "axios";
export default {
  name: "login",
  data: function() {
    return {
      username: "",
      password: ""
    };
  },

  methods: {
    toastOnChange: function() {
      if (!this.validateUsername()) {
        this.$toast.open({
          duration: 500,
          message: `Only lowercase is allowed`,
          position: "is-bottom",
          type: "is-danger"
        });
      }
    },
    validateUsername: function() {
      //black list
      var pattern = /[^a-z]/;
      return !pattern.test(this.username);
    },
    loginRequest: function() {
      const query = `mutation{
        login(credentials: {
          username:"${this.username}",
          password:"${this.password}"
        })  
      }`;
      // if (this.validateUsername) {
      axios
        .post(GRAPHQL_URL, { query: query })
        .then(res => {
          const token = res.data.data.login;
          if (token !== -1) {
            localStorage.setItem("user", token);
            this.$toast.open({
              message: "login is successful",
              type: "is-success"
            });
            setTimeout(() => {
              this.$router.push("Home");
              location.reload();
            }, 600);
          } else {
            this.$toast.open({
              duration: 5000,
              message: `wrong password`,
              position: "is-bottom",
              type: "is-danger"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      // }
    }
  },
  mounted() {
    const loggedIn = localStorage.getItem("user");
    if (loggedIn) this.$router.push("Home");
  }
};
</script>

