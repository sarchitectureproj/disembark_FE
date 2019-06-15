import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
import router from './router'
import axios from 'axios'
Vue.use(Buefy)
Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$API_URL = 'http://dnode2.centralus.cloudapp.azure.com/graphql';


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
