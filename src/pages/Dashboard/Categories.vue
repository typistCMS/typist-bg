<template>
  <div class="categories">
    <h1>Categories</h1>
    <button class="pure-button" @click="addCategory = false" v-if="addCategory">Cancel</button>
    <button class="pure-button" @click="addCategory = true" v-else>Add</button>
    <table class="pure-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="addCategory">
          <td>+</td>
          <td><input type="text" v-model="name" /></td>
          <td>
            <div class="pure-button-group">
              <button class="pure-button" @click="createCategory()">Save</button>
              <button class="pure-button" @click="addCategory = false">Cancel</button>
            </div>
          </td>
        </tr>
        <posts-table-row v-for="category in categories" :category="category" :key="category.id"></posts-table-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import Categories from '@/categories.js'
Vue.component('posts-table-row', {
  template: `
    <tr>
      <td> {{ category.id }} </td>
      <input type="text" v-model="category.name" v-if="edit"/>
      <td v-else> {{ category.name }} </td>
      <td>
        <div class="pure-button-group">
          <button class="pure-button" @click="edit = true" v-if="!edit">Edit</button>
          <button class="pure-button" @click="edit = false" v-else>Cancel</button>
          <button class="pure-button" @click="editCategory(category.id)" v-if="edit">Save</button>
          <button class="pure-button" @click="deleteCategory(category.id)" v-else>Delete</button>
        </div>
      </td>
    </tr>`,
  props: ['category'],
  data () {
    return {
      edit: false
    }
  },
  methods: {
    editCategory () {
      this.$http.put('category/' + this.category.id, { name: this.category.name }).then(({data}) => {
        console.log('category updated')
        this.edit = false
      })
    },
    deleteCategory () {
      this.$http.delete('category/' + this.category.id).then(({data}) => {
        console.log(data + 'deleted')
      })
    }
  }
})
export default {
  mixins: [Categories],
  data () {
    return {
      categories: [],
      addCategory: false,
      name: null
    }
  },
  methods: {
    createCategory () {
      this.addCategory = true
      this.$http.post('categories', {
        name: this.name
      }).then(({data}) => {
        this.categories.push(data)
        this.addCategory = false
      })
    }
  }
}
</script>
