<template>
  <div class="post">
    <form class="pure-form pure-form-stacked" @submit.prevent="publish">
      <label for="title">Title</label>
      <input v-model="post.title" placeholder="Title" />
      <label for="category">Category</label>
      <category-selector v-model="post.category_id"></category-selector>
      <mavon-editor :ishljs="true" v-model="post.content"/>
      <button>Publish</button>
    </form>
    <div v-if="this.$route.params.id">
      <legend>Revisions</legend>
      <table class="pure-table">
        <thead>
          <th>#</th>
          <th>Author</th>
          <th>Created At</th>
          <th>Action</th>
        </thead>

        <tbody>
          <tr v-for="revision in revisions" v-bind:key="revision.id">
            <td>{{ revision.id }}</td>
            <td>{{ revision.user_name }}</td>
            <td>{{ revision.created_at }}</td>
            <td><button @click="rollbackRevision(revision.id)">Roll Back</button><button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CategorySelector from '@/components/CategorySelector'
export default {
  components: {CategorySelector},
  data () {
    return {
      post: {
        category: null,
        category_id: null,
        content: '',
        id: null,
        last_edit_by: null,
        revision_id: null,
        title: null,
        updated_at: null
      },
      revisions: []
    }
  },
  created () {
    if (this.$route.params.id) {
      this.retrivePost()
    }
  },
  methods: {
    retrivePost () {
      this.$http.get('post/' + this.$route.params.id).then((response) => {
        this.post = response.data
        this.retriveRevisions()
      }).catch((error) => {
        console.log(error)
      })
    },
    retriveRevisions () {
      this.$http.get('post/' + this.post.id + '/revisions').then((response) => {
        this.revisions = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    publish () {
      if (this.post.id) {
        this.$http.put('post/' + this.post.id, this.post).then(({data}) => {
          this.post = data
          this.revisions.unshift({
            'id': this.post.revision_id,
            'user_name': this.post.last_edit_by,
            'created_at': this.post.updated_at
          })
        }).catch((error) => {
          console.log(error)
        })
      } else {
        this.$http.post('posts', this.post).then(({data}) => {
          this.post = data
          window.history.pushState(null, 'Typist', '/post/' + this.post.id)
          this.revisions.unshift({
            'id': this.post.revision_id,
            'user_name': this.post.last_edit_by,
            'created_at': this.post.updated_at
          })
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    rollbackRevision (id) {
      this.$http.put('post/' + this.post.id + '/revision/' + id, '').then((response) => {
        this.post = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
