<template>
  <select :value="value" v-on:input="$emit('input', $event.target.value)">
    <option value="" v-if="allowNull">{{ hint }}</option>
    <option value="" v-else disabled>{{ hint }}</option>
    <option value="0">Uncategorized</option>
    <option v-for="category in categories" v-bind:value="category.id" :key="category.id"> {{ category.name }} </option>
  </select>
</template>

<script>
export default {
  props: {
    value: { default: 0 },
    allowNull: { default: false },
    hint: { default: 'Please select' }
  },
  name: 'category-selector',
  data () {
    return {
      categories: []
    }
  },
  created () {
    this.$http.get('categories').then((response) => {
      this.categories = response.data
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>
