<!--
 @Author: ganp
 @Date: 2018/12/28 18:25
 @ProjectName: high-material-music
 @title: sideNav
-->

<template>
  <v-navigation-drawer app>
    <!--<v-toolbar flat>-->
    <!--<v-list>-->
    <!--<v-list-tile>-->
    <!--<v-list-tile-title class="title">-->
    <!--Application-->
    <!--</v-list-tile-title>-->
    <!--</v-list-tile>-->
    <!--</v-list>-->
    <!--</v-toolbar>-->

    <v-divider/>

    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in topItems"
        :key="item.title"
        @click=""
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-subheader>Library</v-subheader>
    </v-list>
    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in bottomItems"
        :key="item.title"
        @click=""
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
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
        { title: 'Recently Added', icon: 'calendar_today' },
        { title: 'Artists', icon: 'person' },
        { title: 'Albums', icon: 'album' },
        { title: 'Songs', icon: 'music_note' },
        { title: 'Playlists', icon: 'playlist_play' }
      ],
      right: null
    }
  }
}
</script>

<style scoped>

</style>
