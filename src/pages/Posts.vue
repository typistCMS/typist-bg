<template>
    <div class="posts">
      <v-card v-for="post in posts" :to="'/post/' + post.id" v-bind:key="post.id">
        <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{post.title}}</h3>
            <div>{{post.content}}</div>
          </div>
        </v-card-title>
      </v-card>
    </div>
</template>

<script>
export default {
  name: 'Posts',
  data () {
    return {
      posts: []
    }
  },
  created () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      this.$http.get('/posts/1', {
      }).then((res) => {
        this.posts = res.data.posts
      })
    }
  }
}
</script>

<style>
</style>
