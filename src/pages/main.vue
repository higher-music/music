<template>
  <!--<div class="layout-container">-->
  <v-app dark>
    <navSide ref="nav"/>
    <tool-bar @menu-click="toggleNav"/>
    <v-content>
      <v-toolbar class="hidden-lg-and-up"/>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </v-content>
    <v-footer height="100" app fixed>
      <player/>
    </v-footer>
  </v-app>
  <!--</div>-->
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
<style>
  /*.layout-container{*/
    /*width: 100%;*/
    /*height: calc(100vh - 100px);*/
  /*}*/
</style>
