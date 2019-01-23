<template>
  <div class="main-container" style="padding: 20px">
    <form action="javascript:getSearchList">
      <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keydown.enter="getSearchList"/>
    </form>
    <div v-if="showHotKeys" class="scroll-container" style="padding-bottom: 5px">
      <span style="font-size: large;font-weight: bolder">HotKeys:</span>
      <v-chip v-for="(item, index) in hotKeys" :key="index" outline text-color="#fff" @click="searchHotKey(item.k)">{{ item.k }}</v-chip>
    </div>
    <div class="scroll-container">
      <SongList :data="songList" :loading="loading"/>
    </div>
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
      hotKeys: [],
      showHotKeys: true
    }
  },
  watch: {
    text() {
      if (!this.text) {
        this.showHotKeys = true
        this.songList = []
      }
    }
  },
  created() {
    getHotKey().then((res) => {
      this.hotKeys = res.data.hotkey
    })
  },
  methods: {
    getSearchList(){
      this.showHotKeys = false
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
    searchHotKey(hotKey) {
      this.text = hotKey
      this.getSearchList()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
