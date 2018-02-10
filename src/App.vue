<template>
  <v-app id="app">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.width > 1264"
      v-model="drawer"
      class="grey lighten-4"
      app
    >
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat @click="dialog = true">edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider dark v-else-if="item.divider" class="my-4" :key="i"></v-divider>
          <v-list-tile :key="i" :to="item.to" v-else>
            <v-list-tile-action>
                <v-icon>{{ item.icon ? item.icon : 'label' }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">{{ item.text ? item.text : item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="purple darken-4" app absolute clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title">Typist Dashboard</span>
    </v-toolbar>

    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
        <v-toolbar color="primary">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Content filtering</v-list-tile-title>
              <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Password</v-list-tile-title>
              <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-dialog>

    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    dialog: false,
    items: [
      { icon: 'public', text: 'Posts', to: '/posts' },
      { icon: 'drafts', text: 'Drafts', to: '/drafts' },
      { divider: true },
      { heading: 'Categories' },
      { icon: 'add', text: 'Create new label' },
      { divider: true },
      { icon: 'archive', text: 'Archive' },
      { icon: 'delete', text: 'Trash' },
      { divider: true },
      { icon: 'settings', text: 'Settings' }
    ]
  }),
  props: {
    source: String
  },
  mounted () {
    this.loadCategories()
  },
  methods: {
    loadCategories () {
      this.$http.get('/categories').then((res) => {
        res.data.some((el, i) => {
          el.to = '/categories/' + el.id
          this.items.splice(4, 0, el)
          return i === 9
        })
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
