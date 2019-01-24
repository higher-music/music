// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'
import Vuetify from 'vuetify'
import store from './vuex/store'
import FastClick from 'fastclick'
import Loading from '@/components/Loading'
import '@/style/index.scss'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
FastClick.attach(document.body);
Vue.use(Vuetify)
Vue.use(Loading)
Vue.config.productionTip = false;

// window.$Raven = Raven
// Raven.config('https://2eff0ea26f4041ccaf115a0a52e50d4c@sentry.io/1376437')
//   .addPlugin(RavenVue, Vue).install()

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
});
