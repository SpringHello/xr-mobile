// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'

import './assets/less/main.less'
import './assets/less/public.less'

//FastClick.attach(document.body)
import {TransferDom} from 'vux'

Vue.directive('transfer-dom', TransferDom)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
