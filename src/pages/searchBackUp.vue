<template>
  <div>
    <v-container fluid>
      <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keyup.enter="searchMusic"/>
      <v-list two-line dark>
        <template v-for="(item, index) in list">
          <v-list-tile :key="index" avatar>
            <v-list-tile-avatar>
              <img :src="getPic(item.albummid)">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.songname"/>
              <v-list-tile-sub-title v-html="item.subtitle"/>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import { search } from '../api/search'
export default {
  name: 'Search',
  data() {
    return {
      text: '',
      list: []
    }
  },
  created() {
    this.searchMusic()
  },
  methods: {
    searchMusic() {
      search('想你', 1, 20).then((res) => {
        this.list = res.data.song.list
      })
    },
    getPic(albumId) {
      return `http://y.gtimg.cn/music/photo_new/T002R90x90M000${albumId}.jpg?max_age=2592000`
    }
  }
}
</script>

<style scoped>

</style>
