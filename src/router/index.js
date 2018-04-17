import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Posts from '@/pages/Dashboard/Posts'
import Post from '@/pages/Dashboard/Post'
import Overview from '@/pages/Dashboard/Overview'
import Categories from '@/pages/Dashboard/Categories'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Overview',
      componenet: Overview
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/posts/:page?',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/post/:id?',
      name: 'Post',
      component: Post
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    }
  ]
})
