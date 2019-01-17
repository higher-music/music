<template>
  <v-app dark>
    <Progress :show="show"/>
    <div class="section-title">Albums</div>
    <AlbumsPicList :data="browseAlbumsList" type="albums"/>
  </v-app>
</template>

<script>
import Progress from '@/components/Progress'
import { getAlbumList } from '@/api/rank'
import { createAlbum } from '@/components/js/album'
import AlbumsPicList from '@/components/AlbumsPicList'
export default {
  name: 'Albums',
  components: { AlbumsPicList, Progress },
  data() {
    return {
      show: true,
      browseAlbumsList: []
    }
  },
  created() {
    getAlbumList().then((res) => {
      res.albumlib.data.list.forEach((item) => {
        this.browseAlbumsList.push(createAlbum(item))
        this.show = false
      })
    })
  }
}
</script>

<style scoped>
  .section-title {
    cursor: default;
    line-height: normal;
    font-size: 24px;
    font-weight: 500;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 5px;
  }
</style>
