<!--
 @Author: ganp
 @Date: 2018/12/28 19:28
 @ProjectName: high-material-music
 @title: browse
-->
<template>
  <div class="main-container">
    <div class="section-title">Top Albums</div>
    <AlbumsList :data="albumsList" />
    <div class="section-title">Top Songs</div>
    <SongList :data="songList" show-rank />
  </div>
</template>

<script>
import AlbumsList from '@/components/AlbumsList'
import SongList from '@/components/SongList'
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { AlbumsList, SongList },
  data: () => ({
  }),
  computed: {
    ...mapGetters([
      'topListData',
      'topListDetailData'
    ]),
    albumsList() {
      if (this.topListData && this.topListData.code === 0 && this.topListData.data && this.topListData.data.topList){
        return this.topListData.data.topList
      }
    },
    songList(){
      if (this.topListDetailData && this.topListDetailData.code === 0 && this.topListDetailData.songlist){
        return this.topListDetailData.songlist
      }
    }
  },
  created(){
    this.getTopListData()
    this.getTopListDetailData(26)
  },
  methods: {
    ...mapActions([
      'getTopListData',
      'getTopListDetailData'
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
