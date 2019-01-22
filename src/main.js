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
import '@/style/index.scss'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
Vue.use(Vuetify)
Vue.config.productionTip = false;

// window.$Raven = Raven
// Raven.config('https://2eff0ea26f4041ccaf115a0a52e50d4c@sentry.io/1376437')
//   .addPlugin(RavenVue, Vue).install()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
});
