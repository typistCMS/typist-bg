// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';
// Init plugin
Vue.use(Loading);
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: 'http://typist.test/',
  timeout: 1000,
  headers: {
    'Authorization': localStorage.getItem('token') ? ('JWT ' + localStorage.getItem('token')) : ''
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
