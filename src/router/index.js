import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/pages/home.vue')
  }
  // {
  //   path: '*',
  //   name: 'NotFound',
  //   component: () => import('@/pages/common/NotFound.vue')
  // }
];


export default new Router({
  linkActiveClass: 'active',
  routes: constantRouterMap
});


