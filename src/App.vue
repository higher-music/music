<template>
  <div id="app">
    <v-app dark>
      <!--<v-navigation-drawer app></v-navigation-drawer>-->
      <navSide ref="nav"/>
      <!--<v-toolbar app/>-->
      <tool-bar @menu-click="toggleNav"/>
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
      <v-footer app/>
    </v-app>
    <!--<router-view/>-->
  </div>
</template>

<script>
import navSide from '@/components/navSide'
import ToolBar from '@/components/ToolBar'
export default {
  name: 'App',
  components: { navSide, ToolBar },
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
