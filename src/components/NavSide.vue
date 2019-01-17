<template>
  <v-navigation-drawer v-model="visible" fixed class="navSide-wapper" width="220" app>
    <v-list>
      <v-list-tile v-for="i in topItems" :key="i.icon" :to="{name: i.title}" ripple active-class="active-link">
        <v-list-tile-action>
          <v-icon>{{ i.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ i.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-subheader>Library</v-subheader>
    <v-list>
      <v-list-tile v-for="i in bottomItems" :key="i.icon" :to="{name: i.title}" active-class="active-link">
        <v-list-tile-action>
          <v-icon>{{ i.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ i.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

</template>

<script>
export default {
  data() {
    return {
      topItems: [
        { title: 'Search', icon: 'search' },
        { title: 'Browse', icon: 'library_music' },
        { title: 'For You', icon: 'favorite' }
      ],
      bottomItems: [
        { title: 'PlayLists', icon: 'playlist_play' },
        { title: 'Artists', icon: 'person' },
        { title: 'Albums', icon: 'album' },
        { title: 'Songs', icon: 'music_note' }
      ],
      visible: null
    }
  },
  methods: {
    toggle() {
      this.visible = !this.visible
    }
  }
}
</script>
