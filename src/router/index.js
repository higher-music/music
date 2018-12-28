import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/browse',
    name: 'browse',
    component: () => import('@/pages/browse.vue')
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import('@/pages/browse.vue')
  }
  // {
  //   path: '*',
  //   name: 'NotFound',
  //   component: () => import('@/pages/common/NotFound.vue')
  // }
];


export default new Router({
  linkActiveClass: 'active-link',
  routes: constantRouterMap
});


