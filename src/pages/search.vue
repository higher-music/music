<template>
  <div class="main-container" style="padding: 20px">
    <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable />
    <SongList ref="searchRef" :data="songList" :loading="loading"/>
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties  */
import SongList from '@/components/SongList'
import { createSong } from '../js/song';
import Progress from '@/components/Progress'
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { SongList, Progress },
  data() {
    return {
      text: '',
      loading: false
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
    text(val) {
      this.loading = true
      this.text = val;
      this.getSearchData(this.text)
    }
  },
  methods: {
    ...mapActions([
      'getSearchData'
    ])
  }
}
</script>
