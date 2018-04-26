<template>
  <div class="overview">
    <h1>Overview</h1>
    <div class="overview-wrapper">
      <div class="recent-fragments">
        <form class="pure-form pure-form-stacked quick-post" @submit.prevent="createPost">
          <textarea
            v-model="quickPost"
            placeholder="What's up today?"
            class="pure-input-1"
            rows="5"></textarea>
          <button class="pure-button pure-button-primary post-button">Post</button>
        </form>

        <h2>Recent Fragments</h2>
        <div class="post-card" v-for="post in postsEx" v-bind:key="post.id">
          <p class="post-meta">
            {{ post.last_edit_by }} - {{ post.updated_at | localTime }}
          </p>
          <vue-markdown :source="post.content"></vue-markdown>
        </div>
      </div>

      <aside>
        <div class="recent-posts">
          <h2>Recent Posts</h2>
          <p v-for="post in posts" v-bind:key="post.id"><a>
              [{{post.updated_at | localTimeDetail}}] {{ post.title }} - {{ post.last_edit_by }}
          </a></p>
        </div>

        <div class="recent-comments">
          <h2>Recent Comments</h2>
          <p v-for="comment in comments" v-bind:key="comment.id">
            [{{comment.post_id}}] [{{comment.commenter_ip}}] {{ comment.content }} </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  components: { VueMarkdown },
  data () {
    return {
      quickPost: '',
      posts: [],
      postsEx: [],
      comments: []
    }
  },
  created () {
    this.retrivePosts()
    this.retrivePostsEx()
    this.retriveComments()
  },
  methods: {
    createPost () {
      let loader = this.$loading.show()
      this.$http.post('posts/', { content: this.quickPost, expand_content: true }).then(({data}) => {
        loader.hide()
        this.retrivePostsEx()
        this.$notify({
          'type': 'success',
          'text': 'Post success',
          'group': 'notify'
        })
      }).catch(({response}) => {
        loader.hide()
        this.$notify({
          'type': 'error',
          'text': response.data.msg,
          'group': 'notify'
        })
      })
    },
    retrivePostsEx () {
      this.$http.get('posts/1/filter/expand/1').then(({data}) => {
        this.postsEx = data.posts
      })
    },
    retrivePosts () {
      this.$http.get('posts/1/filter/expand/0').then(({data}) => {
        this.posts = data.posts
      })
    },
    retriveComments () {
      this.$http.get('comments/1').then(({data}) => {
        this.comments = data.comments
      })
    }
  }
}
</script>

<style>
.post-button {
  float: right;
}

.quick-post {
  padding-bottom: 3em;
}

.post-card {
  padding: 1em 0;
}

@media screen and (min-width: 767px) {
  .overview-wrapper {
    display: flex;
  }

  .overview-wrapper aside {
    padding-left: 1em;
    min-width: 300px;
  }

  .recent-fragments {
    flex: 1;
  }
}
</style>
