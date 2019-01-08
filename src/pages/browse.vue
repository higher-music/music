<template>
  <div class="main-container">
    <div v-show="$store.state.com.loading">
      <Progress/>
    </div>
    <div v-show="!$store.state.com.loading">
      <div class="section-title">Top Albums</div>
      <AlbumsPicList :data="albumsPicList" />
      <div class="section-title">Top Songs</div>
      <SongList :data="songList" inner-data show-rank />
    </div>
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
  data: () => ({
  }),
  computed: {
    ...mapGetters([
      'topListData',
      'topListDetailData',
      'loading'
    ]),
    albumsPicList() {
      if (this.topListData && this.topListData.code === 0 && this.topListData.data && this.topListData.data.topList){
        return this.topListData.data.topList
      }
    },
    songList(){
      if (this.topListDetailData && this.topListDetailData.code === 0 && this.topListDetailData.songlist){
        const songs = []
        this.topListDetailData.songlist.forEach((item) => {
          songs.push(createSong(item.data))
        })
        this.setLoadingState(false)
        return songs
      }
    }
  },
  mounted(){
    this.getTopListData()
    this.getTopListDetailData(26)
  },
  methods: {
    ...mapActions([
      'getTopListData',
      'getTopListDetailData',
      'setLoadingState'
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
