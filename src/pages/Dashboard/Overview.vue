<template>
  <div class="overview">
    <h1>Overview</h1>
    <textarea v-model="quickPost" placeholder="Have anything to say..."></textarea>
    <button>Post</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      quickPost: ''
    }
  }
}
</script>
