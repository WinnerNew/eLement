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

// 全局表格树
Vue.component('tree-table', TreeTable);
// 全局时间过滤器
Vue.filter('dateFormat',function(originval){
  const dt = new Date(originval)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 +'').padStart(2,'0')
  const d = (dt.getDate() + '').padStart(2,'0')
  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
