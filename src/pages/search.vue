<template>
  <div style="padding: 20px">
    <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keydown.enter="getSearchList"/>
    <SongList :data="songList" :loading="loading"/>
  </div>
</template>

<script>
import SongList from '@/components/SongList'
import { search } from '@/api/search'
import { createSong2 } from '@/components/js/song'
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
      console.log('lalalal')
      this.loading = true
      const songs = []
      search(this.text, 1, 50).then((res) => {
        console.log(res)
        res.data.song.list.forEach((item) => {
          console.log(item)
          songs.push(createSong2(item))
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
