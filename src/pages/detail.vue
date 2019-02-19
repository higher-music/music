<template>
  <Detail :data="data"/>
</template>

<script>
import Detail from '@/components/Detail'
import { getMusicList, getImageColor, getAlbumByID } from '@/api/rank'
import { createSong } from '@/components/js/song'
import { getSingerDetail } from '../api/singer'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: { Detail },
  data() {
    return {
      data: {
        info: '',
        name: '',
        singername: '',
        mid: '',
        songList: [],
        img: '',
        btnColor: '',
        diffColor: false
      },
      paramsType: '',
      paramsId: '',
      mapKey: ''
    }
  },
  computed: {
    ...mapGetters([
      'singer',
      'list',
      'album'
    ])
  },
  created() {
    this.paramsType = this.$route.params.type
    this.paramsId = this.$route.params.id
    this.mapKey = location.href
    if (this.checkSavedMusic()) {
      this.$loading.show()
      this.getMusic()
    }
  },
  methods: {
    ...mapActions([
      'addSinger',
      'addList',
      'addAlbum'
    ]),
    // 判断界面之前是否打过
    checkSavedMusic(){
      if (this[this.paramsType].has(this.mapKey)) {
        this.data = this[this.paramsType].get(this.mapKey)
        return false
      }
      return true
    },
    // 获取音乐数据
    async getMusic(){
      const imgUrl = await this.getDiffMusic(this.paramsType)
      const { btnColor, diffColor } = await getImageColor(imgUrl)
      this.data = {
        ...this.data,
        ...{
          btnColor,
          diffColor
        }
      }
      this[`add${this.firstWordUpperCase(this.paramsType)}`]([this.mapKey, this.data])
      this.$loading.hide()
    },
    // 获取不同音乐资源
    getDiffMusic(){
      return new Promise((resolve, reject) => {
        const paramsType = {
          'list': () => {
            getMusicList(this.paramsId).then(res => {
              this.data.name = res.topinfo.ListName
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
            getAlbumByID(this.paramsId).then(res => {
              const imgUrl = `http://y.gtimg.cn/music/photo_new/T002R300x300M000${res.data.mid}.jpg?max_age=2592000`
              this.data.name = res.data.name
              this.data.singermid = res.data.singermid
              this.data.singername = res.data.singername
              this.data.info = res.data.desc
              this.data.img = imgUrl
              const songs = []
              res.data.list.forEach(item => {
                songs.push(createSong(item))
              })
              this.data.songList = songs
              resolve(imgUrl)
            })
          },
          'singer': () => {
            getSingerDetail(this.paramsId).then(res => {
              const imgUrl = `http://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`
              this.data.name = res.data.singer_name
              this.data.img = imgUrl
              const songs = []
              res.data.list.forEach(item => {
                songs.push(createSong(item.musicData))
              })
              this.data.songList = songs
              resolve(imgUrl)
            })
          }
        }
        paramsType[this.paramsType]()
      })
    },
    // 第一个单词转换为大写
    firstWordUpperCase(str){
      return str.toLowerCase().replace(/(\s|^)[a-z]/g, char => char.toUpperCase())
    }
  }
}
</script>
