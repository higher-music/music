<template>
  <v-app dark>
    <navSide ref="nav"/>
    <tool-bar @menu-click="toggleNav" @list-click="toggleDialog"/>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <PlayList @close-click="dialog = false"/>
    </v-dialog>
    <v-content app>
      <transition name="fade">
        <router-view :key="key"/>
      </transition>
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
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
