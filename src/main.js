import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'

import '@/style/index.scss' // global css
import './plugins/lazyload'
import './plugins/registration'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
});
