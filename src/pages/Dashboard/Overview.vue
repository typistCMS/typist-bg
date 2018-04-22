<template>
  <div class="overview">
    <h1>Overview</h1>
    <textarea v-model="inspiration" placeholder="Have anything to say..."></textarea>
    <button>Post</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inspiration: null
    }
  }
}
