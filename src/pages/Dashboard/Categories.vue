<template>
  <div class="categories">
    <h1>Categories</h1>
    <table class="pure-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" v-bind:key="category.id">
            <td refs="category.id"> {{ category.id }} </td>
            <td> {{ category.name }} </td>
            <td><button class="button-error" @click="edit(category.id)">Edit</button><button class="button-error">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Categories from '@/categories.js'
export default {
  mixins: [Categories],
  data () {
    return {
      categories: []
    }
  },
  methods: {
    edit (id) {
      console.log(id)
    },
    delete () {
    }
  }
}
</script>
