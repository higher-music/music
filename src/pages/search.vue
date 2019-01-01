<template>
  <div class="main-container">
    <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keyup.enter="searchMusic"/>
    <SongList ref="searchRef" :data="songList"/>
  </div>
</template>

<script>
import SongList from '@/components/SongList'
import { mapGetters, mapActions } from 'vuex';

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
      if (this.searchData && this.searchData.code === 0 && this.searchData.data && this.searchData.data.song && this.searchData.data.song.list){
        return this.searchData.data.song.list
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
