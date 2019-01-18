<template>
  <v-toolbar :clipped-left="true" class="hidden-lg-and-up" fixed>
    <v-toolbar-side-icon @click.stop="menuClick"/>
    <v-spacer/>
    <Sheet/>
    <v-btn icon @click.stop="listClick">
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
    listClick() {
      this.$emit('list-click')
    }
  }
}
</script>

<style scoped>

</style>
