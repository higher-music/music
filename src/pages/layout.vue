<template>
  <v-app dark>
    <navSide ref="nav"/>
    <tool-bar @menu-click="toggleNav" @list-click="toggleDialog"/>
    <v-content>
      <router-view :key="key"/>
    </v-content>
    <v-footer height="100" fixed app>
      <player @list-click="toggleDialog"/>
    </v-footer>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <PlayList @close-click="dialog = false"/>
    </v-dialog>
  </v-app>
</template>

<script>
import NavSide from '@/components/NavSide'
import ToolBar from '@/components/ToolBar'
import Player from '@/components/Player'
import PlayList from '@/components/PlayList'
export default {
  name: 'Layout',
  components: { NavSide, ToolBar, Player, PlayList },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
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
