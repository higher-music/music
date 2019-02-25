// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import '@/style/index.scss' // global css
import Loading from '@/components/Loading'
import Scroll from '@/components/Scroll'
import noResources from '@/components/noResources'
import Vuetify from 'vuetify'
import VueLazyload from 'vue-lazyload'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import $import from './utils/addCssJS'
require('inobounce')
Vue.use(Vuetify)
Vue.use(Loading)
Vue.use(noResources)
Vue.use(Scroll)

Vue.use(VueLazyload, {
  error: 'static/img/default.jpeg', // 图像的加载失败时 显示的error图标
  loading: 'static/img/default.jpeg', // 图像正常加载时 显示的loading图标
  attempt: 2 // 图像尝试加载 次数
})

// 是否是原生Safari
function isMobileSafari() {
  var ua = navigator.userAgent;
  // IOS系统
  if (/ OS \d/.test(ua)) {
    // 不是Chrome
    if (!~ua.indexOf('CriOS')) {
      // 开头必须为Mozilla
      if (!ua.indexOf('Mozilla')) {
        // 结尾需为：Safari/xxx.xx
        if (/Safari\/[\d\.]+$/.test(ua)) {
          return true;
        }
      }
    }
  }
  return false;
}

if (isMobileSafari()){
  $import('src/style/safari.css', 'css')
}

// 全局Promise异常捕获
window.addEventListener('unhandledrejection', (e) => {
  e.preventDefault()
  console.warn('promise error=>', e.reason);
  return false;
});

/**
 * @param msg 问题
 * @param vm  vm为抛出异常的 Vue 实例
 * @param trace 是组件的继承关系追踪
 */

Vue.config.warnHandler = function(msg, vm, trace) {
  console.warn('warn_msg=>', msg);
  console.warn('warn_vm=>', vm);
  console.warn('warn_trace=>', trace);
};

/**
 * @param err 问题
 * @param vm  vm为抛出异常的 Vue 实例
 * @param info Vue 特定的错误信息，比如错误所在的生命周期钩子
 */
Vue.config.errorHandler = function(err, vm, info) {
  console.error('error=>', err);
  console.error('error_vm=>', vm);
  console.error('error_info=>', info);
};

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
});
