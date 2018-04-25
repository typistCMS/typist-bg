import Vue from 'vue'
import Router from 'vue-router'
const NotFound = () => import('@/pages/404.vue')
const Login = () => import('@/pages/Login')
const Posts = () => import('@/pages/Dashboard/Posts')
const Post = () => import('@/pages/Dashboard/Post')
const Overview = () => import('@/pages/Dashboard/Overview')
const Categories = () => import('@/pages/Dashboard/Categories')
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '/',
      name: 'Overview',
      component: Overview,
      meta: { auth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { auth: false }
    },
    {
      path: '/posts/:page?',
      name: 'Posts',
      component: Posts,
      meta: { auth: true }
    },
    {
      path: '/post/:id?',
      name: 'Post',
      component: Post,
      meta: { auth: true }
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories,
      meta: { auth: true }
    }
  ]
})
