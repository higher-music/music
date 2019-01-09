<template>
  <v-toolbar :clipped-left="true" class="hidden-md-and-up" fixed>
    <v-toolbar-side-icon @click.stop="menuClick"/>
    <v-spacer/>
    <Sheet/>
    <v-btn icon @click.stop="musicClick">
      <v-icon>queue_music</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import Sheet from '@/components/Sheet'
export default {
  name: 'ToolBar',
  components: { Sheet },
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
