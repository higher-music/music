<template>
  <div class="main-container">
    <div class="scroll-container">
      <AlbumsPicList :data="browseAlbumsList" type="album" />
    </div>
  </div>
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
