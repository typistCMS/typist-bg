import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Posts from '@/pages/Posts'
import Post from '@/pages/Post'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/post/:id',
      name: 'Posts',
      component: Post
    }
  ]
})
