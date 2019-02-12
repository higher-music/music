<template>
  <div class="main-container">
    <Scroll>
      <div class="scroll-container">
        <AlbumsPicList :data="newAlbumsList" type="album" />
      </div>
    </Scroll>
  </div>
</template>
<script>
import { getAlbumList } from '@/api/rank'
import { createAlbum } from '@/components/js/album'
import AlbumsPicList from '@/components/AlbumsPicList'
export default {
  components: { AlbumsPicList },
  data() {
    return {
      newAlbumsList: []
    }
  },
  created() {
    this.$loading.show()
    getAlbumList().then(res => {
      res.new_album.data.list.forEach(t => {
        this.newAlbumsList.push(createAlbum(t))
      })
    }).then(() => {
      this.$loading.hide()
    })
  }
}
</script>
