// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'
import axios from 'axios'
import echarts from 'echarts'

import App from './App'
import router from './router'
import store from './store'
import XLSX from 'xlsx'
import './styles/index.scss'
// axios全局配置
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts
Vue.use(XLSX)
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
