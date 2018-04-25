<template>
  <div class="posts">
    <h1>Posts</h1>
    <div class="toolbar pure-form">
      <div class="pure-button-group" role="group">
        <router-link tag="button" to="/post" class="pure-button">Add</router-link>
        <button @click="getPosts(1)" v-if="isTrashed" class="pure-button">Published</button>
        <button @click="showDeleted" class="pure-button" v-else>Trashed</button>
      </div>
      <category-selector v-model="categoryId" hint="All Category" allow-null="true"></category-selector>
    </div>
    <table class="pure-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Ex</th>
          <th>Name</th>
          <th>Category</th>
          <th>Last Edit By</th>
          <th>Created At</th>
          <th>Last Update At</th>
          <th>Action</th>
        </tr>
       </thead>
       <tbody>
         <tr v-for="(post, index) in posts" v-bind:key="post.id">
           <td> {{ post.id }} </td>
           <td> {{ post.expand_content }} </td>
           <td> {{ post.title }} </td>
           <td> {{ post.category_name }} </td>
           <td> {{ post.last_edit_by }} </td>
           <td> {{ post.created_at }} </td>
           <td> {{ post.updated_at }} </td>
           <td v-if="isTrashed">
             <div class="pure-button-group" role="group">
               <button class="pure-button" @click="permanantDelete(index, post.id)">Delete Permanantly</button>
               <button class="pure-button" @click="restoreDeleted(index, post.id)">Recover</button>
             </div>
           </td>
           <td v-else>
             <div class="pure-button-group" role="group">
               <button class="pure-button" @click="edit(post.id)">Edit</button>
               <button class="pure-button" @click="deletePost(index, post.id)">Delete</button>
             </div>
           </td>
         </tr>
        </tbody>
      </table>
      <div class="pure-button-group">
        <button class="pure-button">&lt;&lt;</button>
        <router-link class="pure-button" tag="button" :to="'/posts/' + n"
          v-for="n in Math.ceil(this.count / 10)" :key="n">{{ n }}</router-link>
        <button class="pure-button">&gt;&gt;</button>
      </div>
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
      count: 0,
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
        this.count = res.data.count
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
    permanantDelete (index, id) {
      console.log(id)
    },
    showDeleted () {
      this.posts = []
      this.isTrashed = true
      this.getTrashed(1)
    },
    edit (id) {
      this.$router.push('/post/' + id)
    },
    deletePost (index, id) {
      this.$http.delete('/post/' + id).then(({data}) => {
        console.log(data)
        this.posts.splice(index, 1)
      })
    }
  }
}
</script>

<style>
.toolbar {
  display: flex;
  justify-content: space-between;
}

div.posts {
  display: flex;
  flex-direction: column;
}
</style>
