<template>
  <div class="main-container">
    <div class="scroll-container">
      <AlbumsPicList :data="browseAlbumsList" type="album" />
    </div>
  </div>
</template>
<script>
import { getAlbumList } from '@/api/rank'
import { createAlbum } from '@/components/js/album'
import AlbumsPicList from '@/components/AlbumsPicList'
export default {
  name: 'Albums',
  components: { AlbumsPicList },
  data() {
    return {
      browseAlbumsList: []
    }
  },
  created() {
    this.$loading.show()
    getAlbumList().then((res) => {
      res.new_album.data.list.forEach((item) => {
        this.browseAlbumsList.push(createAlbum(item))
      })
      this.$loading.hide()
    })
  }
}
</script>

<style scoped>
</style>
