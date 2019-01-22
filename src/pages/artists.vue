<template>
  <v-app dark>
    <Progress :show="show"/>
    <AlbumsPicList :data="singerList" type="singer" style="margin-top: 20px"/>
  </v-app>
</template>
<script>
import Progress from '../components/Progress'
import AlbumsPicList from '../components/AlbumsPicList'
import { getSingerList } from '../api/singer'
import { createSinger } from '../components/js/album'

export default {
  name: 'Artists',
  components: { AlbumsPicList, Progress },
  data() {
    return {
      show: true,
      singerList: []
    }
  },
  created() {
    getSingerList().then(res => {
      res.data.list.forEach(t => {
        this.singerList.push(createSinger(t))
        this.show = false
      })
    })
  }
}
</script>

<style scoped>

</style>
