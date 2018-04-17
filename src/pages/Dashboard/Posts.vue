<template>
  <div class="posts">
    <h1>Posts</h1>
    <router-link tag="button" to="/post">Add</router-link>
    <button @click="getPosts(1)" v-if="isTrashed">Published</button>
    <button @click="showDeleted" v-else>Trashed</button>
    <category-selector v-model="categoryId"></category-selector>
    <table class="pure-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Created At</th>
          <th>Last Update</th>
          <th>Action</th>
        </tr>
       </thead>
       <tbody>
         <tr v-for="(post, index) in posts" v-bind:key="post.id">
           <td> {{ post.id }} </td>
           <td> {{ post.title }} </td>
           <td> {{ post.created_at }} </td>
           <td> {{ post.updated_at }} </td>
           <td v-if="isTrashed">
             <button click="permanantDelete">Delete Permanantly</button>
             <button click="recover" @click="restoreDeleted(index, post.id)">Recover</button></td>
           <td v-else>
             <button class="button-error" @click="edit(post.id)">Edit</button>
             <button class="button-error">Delete</button>
           </td>
         </tr>
        </tbody>
      </table>
      <button>&lt;&lt;</button>
      <router-link tag="button" :to="'/posts/' + n" v-for="n in 10" :key="n">{{ n }}</router-link>
      <button>&gt;&gt;</button>
  </div>
</template>

<script>
import CategorySelector from '@/components/CategorySelector'
export default {
  name: 'Posts',
  components: {CategorySelector},
  data () {
    return {
      isTrashed: false,
      categoryId: null,
      posts: []
    }
  },
  watch: {
    'categoryId': {
      handler: function (val, oldVal) {
        this.$route.params.page = 1
        this.getPosts(1)
      }
    }
  },
  created () {
    let page = this.$route.params.page ? this.$route.params.page : 1
    this.getPosts(page)
  },
  beforeRouteUpdate (to, from, next) {
    this.posts = []
    this.getPosts(to.params.page)
    next()
  },
  methods: {
    getPosts (page) {
      let loader = this.$loading.show()
      this.isTrashed = false
      let filterUrlStr = ''
      if (this.categoryId) {
        filterUrlStr = '/filter/category/' + this.categoryId
      }
      this.$http.get('/posts/' + page + filterUrlStr, {
      }).then((res) => {
        this.posts = res.data.posts
        loader.hide()
      })
    },
    getTrashed (page) {
      this.$http.get('/posts/trashed/' + page, {
      }).then(({data}) => {
        this.posts = data.posts
      })
    },
    restoreDeleted (index, id) {
      this.$http.put('/post/trashed/' + id, null).then(({data}) => {
        if (data.status === 'restored') {
          this.posts.splice(index, 1)
          alert('restored')
        }
      })
    },
    showDeleted () {
      this.posts = []
      this.isTrashed = true
      this.getTrashed(1)
    },
    edit (id) {
      this.$router.push('/post/' + id)
    }
  }
}
</script>

<style>
</style>
