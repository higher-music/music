<template>
  <Detail :data="data" :show="show"/>
</template>

<script>
import Detail from '@/components/Detail'
import { getMusicList, getImageColor, getAlbumByID } from '@/api/rank'
import { createSong } from '@/components/js/song'
import { getSingerDetail } from '../api/singer'

export default {
  components: { Detail },
  data() {
    return {
      data: {
        info: '',
        name: '',
        songList: [],
        img: '',
        btnColor: '',
        diffColor: false
      },
      show: true
    }
  },
  created() {
    this.getMusic(this.$route.params.type)
  },
  methods: {
    async getMusic(type){
      const imgUrl = await this.getDiffMusic(type)
      await this.getColor(imgUrl)
      this.show = false
    },
    getDiffMusic(type){
      return new Promise((resolve, reject) => {
        const paramsType = {
          'list': () => {
            getMusicList(this.$route.params.id).then(res => {
              this.data.info = res.topinfo.info
              this.data.img = res.topinfo.pic_album
              const songs = []
              const songList = (res.songlist).slice(0, 100)
              songList.forEach((item) => {
                songs.push(createSong(item.data))
              })
              this.data.songList = songs
              resolve(res.topinfo.pic_album)
            })
          },
          'album': () => {
            getAlbumByID(this.$route.params.id).then(res => {
              const imgUrl = `http://y.gtimg.cn/music/photo_new/T002R300x300M000${res.data.mid}.jpg?max_age=2592000`
              this.data.name = res.data.name
              this.data.info = res.data.desc
              this.data.img = imgUrl
              res.data.list.forEach(item => {
                this.data.songList.push(createSong(item))
              })
              resolve(imgUrl)
            })
          },
          'singer': () => {
            getSingerDetail(this.$route.params.id).then(res => {
              const imgUrl = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`
              this.data.name = res.data.singer_name
              this.data.info = '暂无简介'
              this.data.img = imgUrl
              res.data.list.forEach(item => {
                this.data.songList.push(createSong(item.musicData))
              })
              resolve(imgUrl)
            })
          }
        }
        paramsType[type]()
      })
    },
    getColor(imgUrl){
      return getImageColor(imgUrl).then(res => {
        this.data.btnColor = res.btnColor
        this.data.diffColor = res.diffColor
      })
    }
  }
}
</script>
