<template>
  <div id="app">
    <button class="toggle" @click="sidebar = !sidebar"></button>
    <div class="pure-menu sidebar" :class="{ 'sidebar-show': sidebar }">
      <router-link tag="span" class="pure-menu-heading" to="/">Dashboard</router-link>
      <ul class="pure-menu-list">
        <router-link class="pure-menu-item" active-class="pure-menu-active" tag="li" to="/categories">
            <a class="pure-menu-link">Categories</a>
        </router-link>
        <router-link class="pure-menu-item" active-class="pure-menu-active" tag="li" to="/posts">
            <a class="pure-menu-link">Posts</a>
        </router-link>
        <router-link class="pure-menu-item" active-class="pure-menu-active" tag="li" to="/comments">
            <a class="pure-menu-link">Comments</a>
        </router-link>
      </ul>
    </div>
    <main>
      <router-view></router-view>
    </main>
    <div class="sidebar-mask" v-show="sidebar" @click="sidebar = !sidebar"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sidebar: false
    }
  },
  created () {
    if (!localStorage.getItem('token') && this.$route.name !== 'Login') {
      console.log('tkn')
      this.$router.push('/login')
    }
  }
}
</script>
<style>
  body {
    font-family: 'Raleway', sans-serif;
  }

  .sidebar {
    position: fixed;
    z-index: 3;
    top: 0;
    width: 60vw;
    left: -60vw;
    transition: 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(5px);
    height: 100vh;
  }

  .sidebar-show {
    left: 0;
  }

  .toggle {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #b57edc;
    border: 0;
    outline: none;
  }

  .sidebar-mask {
    position: fixed;
    height: 100vh;
    width: 100vw;
  }

  @media screen and (min-width: 768px) {
    .toggle {
      display: none;
    }

    .sidebar {
      width: 256px;
      left: 0;
    }

    main {
      margin-left: 256px;
      padding: 1em;
    }
  }

  #app {
    display: flex;
  }

  main {
    flex: 1;
    width: 100%;
    padding-left: 1em;
  }
</style>
