<template>
  <div v-show="browseSongList" class="main-container">
    <div class="section-title">Top Albums</div>
    <AlbumsPicList :data="albumsPicList" />
    <div class="section-title">Top Songs</div>
    <SongList :data="browseSongList" inner-data show-rank />
  </div>
</template>

<script>
import AlbumsPicList from '@/components/AlbumsPicList'
import Progress from '@/components/Progress'
import SongList from '@/components/SongList'
import { createSong } from '@/components/js/song';
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { AlbumsPicList, SongList, Progress },
  computed: {
    ...mapGetters([
      'topListData',
      'topListDetailData'
    ]),
    albumsPicList() {
      if (this.topListData && this.topListData.code === 0 && this.topListData.data && this.topListData.data.topList){
        return this.topListData.data.topList
      }
    },
    browseSongList(){
      if (this.topListDetailData && this.topListDetailData.code === 0 && this.topListDetailData.songlist){
        const songs = []
        const songList = (this.topListDetailData.songlist).slice(0, 100)
        songList.forEach((item) => {
          songs.push(createSong(item.data))
        })
        this.$loading.hide()
        return songs
      }
    }
  },
  created(){
    this.$loading.show()
  },
  mounted(){
    this.getTopListData()
    this.getTopListDetailData(26)
  },
  methods: {
    ...mapActions([
      'getTopListData',
      'getTopListDetailData'
      // 'setLoadingState'
    ])
  }
}
</script>

<style scoped>
  .section-title{
    cursor: default;
    line-height: normal;
    font-size: 24px;
    font-weight: 500;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 5px;
  }
</style>
