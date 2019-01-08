// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify'
import store from './vuex/store'
import Progress from '@/components/js/loading'
import '@/style/index.scss'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
Vue.use(Vuetify)
Vue.use(Progress)
// import * as filters from './util/filter';

Vue.config.productionTip = false;

//
// Vue.directive('loading', {
//   componentUpdated: function(el, binding) {
//     console.log(binding)
//     if (binding.value === false){
//       el.innerHTML = `<div class="loader">
//     <svg class="circular" viewBox="25 25 50 50">
//       <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"/>
//     </svg>
//   </div>`
//     }
//   }
// })

// Object.keys(filters).forEach(k => Vue.filter(k, filters[k])); // 注册过滤器

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
});
