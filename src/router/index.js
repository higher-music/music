import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/browse'
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/pages/search.vue')
  },
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('@/pages/browse.vue')
  },
  {
    path: '/foryou',
    name: 'For You',
    component: () => import('@/pages/forYou.vue')
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


