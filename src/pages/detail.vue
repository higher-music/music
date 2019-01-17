<template>
  <Detail :data="data" :show="show"/>
</template>

<script>
import Detail from '@/components/Detail'
import { getMusicList, getImageColor, getAlbumByID } from '@/api/rank'
import { createSong } from '@/components/js/song'

export default {
  components: { Detail },
  data() {
    return {
      data: {
        info: '',
        name: '',
        songList: [],
        img: '',
        btnColor: ''
      },
      show: true
    }
  },
  created() {
    if (this.$route.params.type === 'list') {
      getMusicList(this.$route.params.id).then(res => {
        getImageColor(res.topinfo.pic_album).then(res => {
          this.data.btnColor = res
        }).then(() => {
          this.data.info = res.topinfo
          this.data.img = res.topinfo.pic_album
          const songs = []
          const songList = (res.songlist).slice(0, 100)
          songList.forEach((item) => {
            songs.push(createSong(item.data))
          })
          this.data.songList = songs
          this.show = false
        })
      })
    } else {
      getAlbumByID(this.$route.params.id).then(res => {
        const imgUrl = `http://y.gtimg.cn/music/photo_new/T002R300x300M000${res.data.mid}.jpg?max_age=2592000`
        getImageColor(imgUrl).then(res => {
          this.data.btnColor = res
        }).then(() => {
          this.data.name = res.data.name
          this.data.info = res.data.desc
          this.data.img = imgUrl
          res.data.list.forEach(item => {
            this.data.songList.push(createSong(item))
          })
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
