// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

import mavonEditor from 'mavon-editor'
import Loading from 'vue-loading-overlay'
import Notifications from 'vue-notification'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css'
import 'mavon-editor/dist/css/index.css'
// Init plugin
Vue.use(VueAxios, axios)
Vue.use(Loading)
Vue.use(mavonEditor)
Vue.use(Notifications)
Vue.router = router
Vue.use(VueAuth, {
  auth: require('@/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  fetchData: {
    enabled: false
  },
  loginData: {
    url: 'user/token',
    fetchUser: false
  },
  refreshData: {
    url: 'user/token',
    method: 'PUT',
    enabled: true,
    interval: 8
  }
})

Vue.config.productionTip = false
Vue.axios.defaults.baseURL = 'http://typist.test/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
