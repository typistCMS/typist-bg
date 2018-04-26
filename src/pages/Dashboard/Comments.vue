<template>
  <div class="comments">
    <h1>Comments</h1>
    <table class="pure-table">
      <thead>
        <th>Post #</th>
        <th>Ip</th>
        <th>Content</th>
        <th>Action</th>
      </thead>
      <tbody>
        <tr v-for="(comment, index) in comments" v-bind:key="comment.id">
          <td>{{ comment.post_id }}</td>
          <td>{{ comment.commenter_ip }}</td>
          <td>{{ comment.content }}</td>
          <td><button class="pure-button" @click="deleteComment(index, comment.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <div class="pure-button-group">
      <button class="pure-button">&lt;&lt;</button>
      <router-link class="pure-button" tag="button" :to="'/comments/' + n"
        v-for="n in Math.ceil(this.count / 10)" :key="n">{{ n }}</router-link>
      <button class="pure-button">&gt;&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0,
      comments: []
    }
  },
  created () {
    let page = this.$route.params.page ? this.$route.params.page : 1
    this.getComments(page)
  },
  beforeRouteUpdate (to, from, next) {
    this.comments = []
    this.getComments(to.params.page)
    next()
  },
  methods: {
    getComments (page) {
      let loader = this.$loading.show()
      this.$http.get('/comments/' + page).then(({data}) => {
        this.count = data.count
        this.comments = data.comments
        loader.hide()
      })
    },
    deleteComment (index, id) {
      this.$http.delete('/comment/' + id).then(({data}) => {
        this.comments.splice(index, 1)
        this.$notify({
          'type': 'success',
          'text': 'Comment deleted',
          'group': 'notify'
        })
      }).catch(({response}) => {
        this.$notify({
          'type': 'error',
          'text': response.data.error,
          'group': 'notify'
        })
      })
    }
  }
}
</script>
