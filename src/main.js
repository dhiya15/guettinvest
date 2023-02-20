import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './views/Home';
import NotFound from './views/NotFound';
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Requested-With": "XMLHttpRequest"
};
Vue.prototype.$http = axios

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/*',
      component: NotFound,
      meta: {
        title: 'Error 404'
      }
    }
  ]
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
