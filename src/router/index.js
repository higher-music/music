import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  },
  {
    path: '/',
    component: () => import('@/pages/layout.vue'),
    children: [
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
        // meta: { keepAlive: true }
      },
      {
        path: '/:type/:id',
        component: () => import('@/pages/details.vue')
      },
      {
        path: '/for_you',
        name: 'For You',
        component: () => import('@/pages/forYou.vue')
      },
      {
        path: '/hot_artists',
        name: 'Hot Artists',
        component: () => import('@/pages/artists.vue')
      },
      {
        path: '/recently_added',
        name: 'Recently Added',
        component: () => import('@/pages/recentlyAdded.vue')
      }
    ]
  }
];


const router = new Router({
  linkActiveClass: 'active-link',
  routes: constantRouterMap
});

export default router
