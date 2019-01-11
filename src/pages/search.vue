<template>
  <div style="padding: 20px">
    <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keydown.enter="getSearchList"/>
    <div class="hotkey">
      <span style="font-size: large;font-weight: bolder">HotKeys:</span>
      <v-chip v-for="(item, index) in hotkeys" :key="index" outline text-color="#fff" @click="searchHotKey(item.k)">{{ item.k }}</v-chip>
    </div>
    <SongList :data="songList" :loading="loading"/>
  </div>
</template>

<script>
import SongList from '@/components/SongList'
import { search, getHotKey } from '@/api/search'
import { createSong2 } from '@/components/js/song'
import Progress from '@/components/Progress'

export default {
  components: { SongList, Progress },
  data() {
    return {
      text: '',
      loading: false,
      songList: [],
      searchTimer: null,
      hotkeys: []
    }
  },
  watch: {
    text(){
      if (this.searchTimer){
        clearTimeout(this.searchTimer);
      }
      this.searchTimer = setTimeout(() => {
        this.getSearchList()
        this.searchTimer = null
      }, 2000)
    }
  },
  created() {
    getHotKey().then((res) => {
      this.hotkeys = res.data.hotkey
    })
  },
  methods: {
    getSearchList(){
      console.log('lalalal')
      this.loading = true
      const songs = []
      search(this.text, 1, 50).then((res) => {
        res.data.song.list.forEach((item) => {
          songs.push(createSong2(item))
        })
        this.songList = songs
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    },
    searchHotKey(hotkey) {
      this.text = hotkey
    }
  }
}
</script>
<style lang="scss" scoped>
  .hotkey {
    display: flex;
    display: -moz-flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    align-items: center;
  }
</style>
