<template>
  <v-app dark>
    <navSide ref="nav"/>
    <tool-bar @menu-click="toggleNav"/>
    <v-content app>
      <v-toolbar class="hidden-md-and-up"/>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </v-content>
    <v-footer height="80" app fixed>
      <player/>
    </v-footer>
  </v-app>
</template>

<script>
import NavSide from '@/components/NavSide'
import ToolBar from '@/components/ToolBar'
import Player from '@/components/Player'
export default {
  name: 'Main',
  components: { NavSide, ToolBar, Player },
  methods: {
    toggleNav() {
      this.$refs.nav.toggle()
    }
  }
}
</script>

<style scoped>

</style>
