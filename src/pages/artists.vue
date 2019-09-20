<template>
  <div class="main-container">
    <PicList :data="hotArtistsList" type="singer"/>
  </div>
</template>
<script>
import PicList from '@/components/PicList'
import { getSingerList } from '@/api/singer'
import { createSinger } from '@/components/js/album'

export default {
  name: 'Artists',
  components: { PicList },
  data() {
    return {
      hotArtistsList: []
    }
  },
  beforeCreate(){
    this.$loading.show()
  },
  created() {
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
