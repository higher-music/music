<template>
  <v-toolbar :clipped-left="true" class="hidden-md-and-up" fixed>
    <v-toolbar-side-icon @click.stop="menuClick"/>
    <v-spacer/>
    <Sheet/>
    <v-btn :to="{name: 'PlayLists'}" icon>
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
    }
  }
}
</script>

<style scoped>

</style>
