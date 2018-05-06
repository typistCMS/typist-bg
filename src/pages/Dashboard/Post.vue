<template>
  <div class="post">
    <form class="pure-form pure-form-stacked" @submit.prevent="publish">
      <label for="title">Title</label>
      <input v-model="post.title" placeholder="Title" />
      <label for="category">Category</label>
      <category-selector v-model="post.category_id"></category-selector>
      <input v-model="post.expand_content" type="checkbox">
      <label for="expand_content">Expand Post</label>
      <mavon-editor class="no-pure" :ishljs="true" :toolbars="toolBars" v-model="post.content"/>
      <div class="pure-button-group">
        <button class="pure-button">Publish</button>
        <button class="pure-button">Discard</button>
      </div>
    </form>
    <div v-if="this.$route.params.id">
      <legend>Revisions</legend>
      <table class="pure-table rev-table">
        <thead>
          <th>#</th>
          <th>Author</th>
          <th>Created At</th>
          <th>Action</th>
        </thead>

        <tbody>
          <tr
            v-for="(revision, index) in revisions"
            v-bind:key="revision.id"
          >
            <td>{{ revision.id }}</td>
            <td>{{ revision.user_name }}</td>
            <td>{{ revision.created_at || localTimeDetail }}</td>
            <td>
              <div class="pure-button-group">
                <button class="pure-button" @click="rollbackRevision(index, revision.id)">Roll Back</button>
                <button class="pure-button" @click="deleteRevision(index, revision.id)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CategorySelector from '@/components/CategorySelector'
export default {
  components: { CategorySelector },
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
        updated_at: null,
        expand_content: false
      },
      revisions: [],
      toolBars: {
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  created () {
    if (this.$route.params.id) {
      this.retrivePost()
    }
  },
  methods: {
    retrivePost () {
      let loader = this.$loading.show()
      this.$http.get('post/' + this.$route.params.id).then((response) => {
        this.post = response.data
        this.retriveRevisions()
        loader.hide()
      }).catch(({response}) => {
      })
    },
    retriveRevisions () {
      let loader = this.$loading.show()
      this.$http.get('post/' + this.post.id + '/revisions').then((response) => {
        this.revisions = response.data
        loader.hide()
      }).catch((error) => {
        console.log(error)
      })
    },
    notify () {
      this.$notify({
        type: 'success',
        group: 'notify',
        text: 'Post Published'
      })
    },
    publish () {
      let loader = this.$loading.show()
      if (this.post.id) {
        this.$http.put('post/' + this.post.id, this.post).then(({data}) => {
          if (this.post.revision_id !== data.revision_id) {
            this.post = data
            this.revisions.unshift({
              'id': this.post.revision_id,
              'user_name': this.post.last_edit_by,
              'created_at': this.post.updated_at
            })
            this.notify()
          }
          loader.hide()
        }).catch(({response}) => {
          if (response.status === 401) {
            this.$router.push('/login')
          }
        })
      } else {
        this.$http.post('posts', this.post).then(({data}) => {
          this.post = data
          this.revisions.unshift({
            'id': this.post.revision_id,
            'user_name': this.post.last_edit_by,
            'created_at': this.post.updated_at
          })
          loader.hide()
          this.$router.push('/post/' + data.id)
          this.notify()
        }).catch(({response}) => {
          if (response.status === 401) {
            this.$router.push('/login')
          }
        })
      }
    },
    rollbackRevision (index, id) {
      let loader = this.$loading.show()
      this.$http.put('post/' + this.post.id + '/revision/' + id, '').then((response) => {
        this.post = response.data
        let revisions = this.revisions.splice(index, 1)
        this.revisions.unshift(revisions[0])
        loader.hide()
        this.$notify({
          group: 'notify',
          text: 'Revision is rollback to ' + id
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    deleteRevision (index, id) {
      let loader = this.$loading.show()
      this.$http.delete('post/' + this.post.id + '/revision/' + id, '').then((response) => {
        this.revisions.splice(index, 1)
        loader.hide()
        this.$notify({
          group: 'notify',
          text: 'Revision deleted ' + id
        })
      }).catch((error) => {
        loader.hide()
        this.$notify({
          group: 'notify',
          type: error,
          text: error.response.data.msg
        })
      })
    }
  }
}
</script>

<style>
.rev-table tr:first-child td {
  background-color: #f3eaf9;
  color: #b57edc;
}

.auto-textarea-wrapper .auto-textarea-input.no-border {
  box-shadow: none;
}
</style>
