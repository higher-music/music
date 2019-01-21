<template>
  <v-app dark>
    <navSide ref="nav"/>
    <tool-bar @menu-click="toggleNav" @list-click="toggleDialog"/>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <PlayList @close-click="dialog = false"/>
    </v-dialog>
    <v-content app>
      <v-toolbar class="hidden-lg-and-up"/>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </v-content>
    <v-footer height="100" app>
      <player @list-click="toggleDialog"/>
    </v-footer>
  </v-app>
</template>

<script>
import NavSide from '@/components/NavSide'
import ToolBar from '@/components/ToolBar'
import Player from '@/components/Player'
import PlayList from '@/components/PlayList'
export default {
  name: 'Main',
  components: { NavSide, ToolBar, Player, PlayList },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    toggleNav() {
      this.$refs.nav.toggle()
    },
    toggleDialog() {
      this.dialog = !this.dialog
    }
  }
}
</script>
