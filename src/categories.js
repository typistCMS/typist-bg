var categories = {
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

export default categories
