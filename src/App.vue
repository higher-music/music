<template>
  <div id="app">
    <v-app dark>
      <navSide ref="nav"/>
      <tool-bar @menu-click="toggleNav"/>
      <v-content>
        <router-view/>
      </v-content>
      <v-footer app/>
    </v-app>
  </div>
</template>

<script>
import navSide from '@/components/NavSide'
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
