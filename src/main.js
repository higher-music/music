// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './vuex/store'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import 'babel-polyfill'
import '@/style/index.scss' // global css
import Loading from '@/components/Loading'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
Vue.use(Vuetify)
Vue.use(Loading)

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
