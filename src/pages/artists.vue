<template>
  <div class="main-container">
    <div class="scroll-container">
      <AlbumsPicList :data="singerList" type="singer"/>
    </div>
  </div>
</template>
<script>
import AlbumsPicList from '../components/AlbumsPicList'
import { getSingerList } from '../api/singer'
import { createSinger } from '../components/js/album'

export default {
  name: 'Artists',
  components: { AlbumsPicList },
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this.$loading.show()
    getSingerList().then(res => {
      res.data.list.forEach(t => {
        this.singerList.push(createSinger(t))
      })
    })
    this.$loading.hide()
  }
}
</script>
