<template>
  <div id="app">
    <v-app dark>
      <navSide ref="nav"/>
      <tool-bar @menu-click="toggleNav"/>
      <v-content>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
      </v-content>
      <v-footer height="64" app>
        <player/>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import NavSide from '@/components/NavSide'
import ToolBar from '@/components/ToolBar'
import Player from '@/components/Player'
export default {
  name: 'App',
  components: { NavSide, ToolBar, Player },
  data() {
    return {
      json: '',
      visible: true
    }
  },
  methods: {
    toggleNav() {
      this.$refs.nav.toggle()
    }
  }
};
</script>
