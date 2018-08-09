// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex'
//import FastClick from 'fastclick'
import App from './App'

import {ToastPlugin} from 'vux'

Vue.use(ToastPlugin, {time: 3500})

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

import VueClipboards from 'vue-clipboards'

Vue.use(VueClipboards)

import {InfiniteScroll} from 'mint-ui';

Vue.use(InfiniteScroll);


import {ConfirmPlugin} from 'vux'

Vue.use(ConfirmPlugin)

import {AlertPlugin} from 'vux'

Vue.use(AlertPlugin)

//import './assets/js/wxjssdk'
/*import {WechatPlugin} from 'vux'

 Vue.use(WechatPlugin)

 Vue.wechat.config({
 debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
 appId: 'gh_d44d961923ba', // 必填，公众号的唯一标识
 timestamp: 520, // 必填，生成签名的时间戳
 nonceStr: '520', // 必填，生成签名的随机串
 signature: '测试',// 必填，签名，
 jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，
 })*/

import './assets/less/main.less'
import './assets/less/public.less'
import './assets/less/main.less'
import './assets/css/iconfont.css'

//FastClick.attach(document.body)
import {TransferDom} from 'vux'

Vue.directive('transfer-dom', TransferDom)
Vue.config.productionTip = false

var pxPreRem = 750 / 100;
//console.log(document.documentElement.clientWidth)
var fontSize = document.documentElement.clientWidth / pxPreRem || document.body.clientWidth / pxPreRem
document.documentElement.style.fontSize = fontSize + 'px';

// 日期原型对象拓展
Date.prototype.format = function (fmt) {
  var o = {
    'y+': this.getFullYear(),
    'M+': this.getMonth() + 1,                 // 月份
    'd+': this.getDate(),                    // 日
    'h+': this.getHours(),                   // 小时
    'm+': this.getMinutes(),                 // 分
    's+': this.getSeconds(),                 // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S+': this.getMilliseconds()             // 毫秒
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k == 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      } else if (k == 'S+') {
        var lens = RegExp.$1.length
        lens = lens == 1 ? 3 : lens
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens))
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  return fmt
}


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
