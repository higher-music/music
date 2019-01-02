<template>
  <div id="app">
    <v-app dark>
      <navSide ref="nav"/>
      <tool-bar @menu-click="toggleNav"/>
      <v-content v-show="$store.state.com.loading">
        <Progress/>
      </v-content>
      <v-content v-show="$store.state.com.loading">
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
import Progress from '@/components/Progress'

export default {
  name: 'App',
  components: { NavSide, ToolBar, Player, Progress },
  data() {
    return {
      json: '',
      visible: true
    }
  },
  mounted(){
    console.log(this.$store.state.com.loading)
  },
  methods: {
    toggleNav() {
      this.$refs.nav.toggle()
    }
  }
};
</script>
