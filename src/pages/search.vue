<template>
  <div class="main-container" style="padding: 20px">
    <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keyup.enter="searchMusic"/>
    <SongList ref="searchRef" :data="songList"/>
  </div>
</template>

<script>
import SongList from '@/components/SongList'
import { createSong } from '../js/song'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { SongList },
  data() {
    return {
      text: ''
    }
  },
  computed: {
    ...mapGetters([
      'searchData'
    ]),
    songList(){
      const songs = []
      if (this.searchData && this.searchData.code === 0 && this.searchData.data && this.searchData.data.song && this.searchData.data.song.list){
        this.searchData.data.song.list.forEach((item) => {
          songs.push(createSong(item))
        })
        return songs
      }
    }
  },
  methods: {
    ...mapActions([
      'getSearchData'
    ]),
    searchMusic(){
      this.getSearchData(this.text)
    }
  }
}
</script>
