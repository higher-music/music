<template>
  <v-toolbar :clipped-left="true" class="hidden-sm-and-up" app>
    <v-toolbar-side-icon @click.stop="menuClick"/>
    <v-spacer/>
    <v-btn icon @click.stop="settingClick">
      <v-icon>settings</v-icon>
    </v-btn>
    <v-btn icon @click.stop="musicClick">
      <v-icon>queue_music</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ToolBar',
  methods: {
    menuClick() {
      this.$emit('menu-click')
    },
    settingClick() {
      this.$emit('setting-click')
    },
    musicClick() {
      this.$emit('music-click')
    }
  }
}
</script>

<style scoped>

</style>
