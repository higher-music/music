<template>
  <div style="padding: 20px">
    <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keydown.enter="search"/>
    <SongList ref="searchRef" :data="songList" :loading="loading"/>
  </div>
</template>

<script>
import SongList from '@/components/SongList'
import { createSong } from '@/components/js/song'
import Progress from '@/components/Progress'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { SongList, Progress },
  data() {
    return {
      text: '',
      loading: false,
      searchTimer: null
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
        this.loading = false
        return songs
      }
    }
  },
  watch: {
    text(){
      if (this.searchTimer){
        clearTimeout(this.searchTimer);
      }
      this.searchTimer = setTimeout(() => {
        this.search()
        this.searchTimer = null
      }, 2000)
    }
  },
  methods: {
    ...mapActions([
      'getSearchData'
    ]),
    search() {
      this.loading = true
      this.getSearchData(this.text)
    }
  }
}
</script>
