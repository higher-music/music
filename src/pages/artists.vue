<template>
  <div class="main-container">
    <Scroll>
      <div class="scroll-container">
        <AlbumsPicList :data="hotArtistsList" type="singer"/>
      </div>
    </Scroll>
  </div>
</template>
<script>
import AlbumsPicList from '@/components/AlbumsPicList'
import { getSingerList } from '@/api/singer'
import { createSinger } from '@/components/js/album'

export default {
  components: { AlbumsPicList },
  data() {
    return {
      hotArtistsList: []
    }
  },
  created() {
    this.$loading.show()
    getSingerList().then(res => {
      res.data.list.forEach(t => {
        this.hotArtistsList.push(createSinger(t))
      })
    }).then(() => {
      this.$loading.hide()
    })
  }
}
</script>
