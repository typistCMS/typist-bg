<template>
  <select :value="value" v-on:input="$emit('input', $event.target.value)">
    <option disabled value="">Please select one</option>
    <option v-for="category in categories" v-bind:value="category.id" :key="category.id"> {{ category.name }} </option>
  </select>
</template>

<script>
export default {
  props: {
    value: { default: 0 }
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
