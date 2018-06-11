// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex'
//import FastClick from 'fastclick'
import App from './App'

import  {ToastPlugin} from 'vux'
Vue.use(ToastPlugin)

import './assets/less/main.less'
import './assets/less/public.less'

//FastClick.attach(document.body)
import {TransferDom} from 'vux'

Vue.directive('transfer-dom', TransferDom)
Vue.config.productionTip = false


/*var isAndroid = window.navigator.appVersion.match(/android/gi);
/!* 判断iphone ipad不考虑*!/
var isIPhone = window.navigator.appVersion.match(/iphone/gi);
var devicePixelRatio = window.devicePixelRatio;
let scale, dpr
if (isIPhone) {
  // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
  if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
    dpr = 3;
  } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
    dpr = 2;
  } else {
    dpr = 1;
  }
} else {
  // 其他设备下，仍旧使用1倍的方案
  dpr = 1;
}
/!*缩放值*!/
scale = 1 / dpr;

var oMeta = document.createElement('meta');
oMeta.name = 'viewport'
oMeta.content = `initial-scale=${scale}`
document.getElementsByTagName('head')[0].appendChild(oMeta);

/!*获取布局视口宽度,也可用document.documentElement.clientWidth*!/
var width = document.documentElement.getBoundingClientRect().width;

/!* 判断屏幕宽度，如果dpr为1且宽度>540 则恒定为540px，dpr为2如果宽度>1080则恒定为1080px*!/

if (width / dpr > 540) {
  width = 540 * dpr;
}

/!*将布局视口宽度除以10得到html字体大小*!/
var rem = width / 10;
document.documentElement.style.fontSize = rem + 'px';*/

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
