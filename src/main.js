// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify'
// import store from './vuex/store'
import '@/style/index.scss'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
Vue.use(Vuetify)
// import * as filters from './util/filter';

Vue.config.productionTip = false;

// Object.keys(filters).forEach(k => Vue.filter(k, filters[k])); // 注册过滤器

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App
});
