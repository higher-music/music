import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/iframe/:id/:autoplay',
    name: 'IFrame',
    component: () => import('@/pages/IFrame.vue')
  },
  {
    path: '/',
    component: () => import('@/pages/main.vue'),
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
        component: () => import('@/pages/browse.vue'),
        meta: { keepAlive: true }
      },
      {
        path: '/:type/:id',
        component: () => import('@/pages/detail.vue')
      },
      {
        path: '/albums',
        name: 'Albums',
        component: () => import('@/pages/albums.vue')
      },
      {
        path: '/for_you',
        name: 'For You',
        component: () => import('@/pages/forYou.vue')
      },
      {
        path: '/artists',
        name: 'Artists',
        component: () => import('@/pages/artists.vue')
      },
      {
        path: '/songs',
        name: 'Songs',
        component: () => import('@/pages/songs.vue')
      },
      {
        path: '/play_lists',
        name: 'PlayLists',
        component: () => import('@/pages/playLists.vue')
      },
      {
        path: '*',
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue')
      }
    ]
  }
];


const router = new Router({
  linkActiveClass: 'active-link',
  mode: 'history',
  routes: constantRouterMap
});

router.beforeEach((to, from, next) => {
  // console.log(to)
  next()
})


export default router
