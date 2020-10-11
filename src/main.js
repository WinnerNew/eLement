import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// axios.defaults.baseURL ='https://www.liulongbin.top:8888/api/private/v1';
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1';
Vue.prototype.$http = axios;

axios.interceptors.request.use(config => {
  Nprogress.start();
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})
axios.interceptors.response.use(config => {
  Nprogress.done();
  return config;
})




Vue.config.productionTip = false


Vue.component('tree-table', TreeTable);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
