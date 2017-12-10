import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index.vue'], resolve)
    },
    {
      path: '/movieList',
      name: 'movieList',
      component: resolve => require(['@/pages/movieList'], resolve)
    },
    {
      path: '/adminList',
      name: 'adminList',
      component: resolve => require(['@/pages/adminList'], resolve)
    },
    {
      path: '/movieAdmin',
      name: 'movieAdmin',
      component: resolve => require(['@/pages/movieAdmin'], resolve)
    },
    {
      path: '/movieAdmin/:id',
      name: 'movieAdminId',
      component: resolve => require(['@/pages/movieAdmin'], resolve)
    },
    {
      path: '/movieDetail/:id',
      name: 'movieDetail',
      component: resolve => require(['@/pages/movieDetail'], resolve)
    },
    {
      path: '/setting',
      name: 'setting',
      component: resolve => require(['@/pages/setting'], resolve)
    }
  ]
})
