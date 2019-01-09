<template>
  <div style="padding: 20px">
    <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keydown.enter="getSearchList"/>
    <SongList :data="songList" :loading="loading"/>
  </div>
</template>

<script>
import SongList from '@/components/SongList'
import { search } from '@/api/search'
import { createSong } from '@/components/js/song'
import Progress from '@/components/Progress'

export default {
  components: { SongList, Progress },
  data() {
    return {
      text: '',
      loading: false,
      songList: [],
      searchTimer: null
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
  methods: {
    getSearchList(){
      this.loading = true
      const songs = []
      search(this.text, 1, 50).then((res) => {
        res.data.song.list.forEach((item) => {
          songs.push(createSong(item))
        })
        this.songList = songs
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    }
  }
}
</script>
