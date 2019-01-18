<template>
  <v-app dark>
    <Progress :show="show"/>
    <AlbumsPicList :data="browseAlbumsList" type="album" style="margin-top: 20px"/>
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
      res.new_album.data.list.forEach((item) => {
        this.browseAlbumsList.push(createAlbum(item))
        this.show = false
      })
    })
  }
}
</script>

<style scoped>
</style>
