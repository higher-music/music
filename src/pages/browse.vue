<!--
 @Author: ganp
 @Date: 2018/12/28 19:28
 @ProjectName: high-material-music
 @title: browse
-->
<template>
  <div class="main-container">
    <div class="section-title">Top Albums</div>
    <AlbumsList/>
    <div class="section-title">Top Songs</div>
    <SongList show-rank/>
  </div>
</template>

<script>
import AlbumsList from '@/components/AlbumsList'
import SongList from '@/components/SongList'

export default {
  components: { AlbumsList, SongList },
  data: () => ({
  })
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
