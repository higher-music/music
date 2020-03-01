<template>
  <v-toolbar :clipped-left="true" flat height="56" class="hidden-lg-and-up" fixed>
    <v-toolbar-side-icon :ripple="false" @click.stop="menuClick"/>
    <v-spacer/>
    <Sheet/>
    <v-btn :ripple="false" icon @click.stop="listClick">
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
