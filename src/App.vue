<template>
  <div id="app">
    <div id="loading" v-if="!$auth.ready()">
      loading...
    </div>
    <div id="main" v-else>
      <button class="toggle" @click="sidebar = !sidebar"></button>
      <div class="pure-menu sidebar" :class="{ 'sidebar-show': sidebar }">
        <router-link tag="span" class="pure-menu-heading" to="/">Dashboard</router-link>
        <ul class="pure-menu-list">
          <router-link class="pure-menu-item" active-class="pure-menu-active" tag="li" to="/categories">
              <a class="pure-menu-link">Categories</a>
          </router-link>
          <router-link class="pure-menu-item" active-class="pure-menu-active" tag="li" to="/posts/1">
              <a class="pure-menu-link">Posts</a>
          </router-link>
          <router-link class="pure-menu-item" active-class="pure-menu-active" tag="li" to="/comments/1">
              <a class="pure-menu-link">Comments</a>
          </router-link>
          <li class="pure-menu-item" @click="this.logout"><a class="pure-menu-link">Logout</a></li>
        </ul>
      </div>
      <main>
        <router-view></router-view>
      </main>
      <notifications group="notify" position="top center" />
      <div class="sidebar-mask" v-show="sidebar" @click="sidebar = !sidebar"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sidebar: false
    }
  },
  methods: {
    logout () {
      this.$auth.logout({
        success () {
          this.$router.push('login')
          this.$notify({
            type: 'success',
            text: 'You\'ve been logged out',
            group: 'notify'
          })
        }
      })
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
    height: 32px;
    width: 32px;
    background-color: #b57edc;
    border: 0;
    outline: none;
  }

  .sidebar-mask {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
  }

  main {
    flex: 1;
    width: calc(100vw - 256px - 2em);
    padding-left: 1em;
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
      padding-left: calc(256px + 1em);
    }
  }

  #app {
    display: flex;
  }
</style>
