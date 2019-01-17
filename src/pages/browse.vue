<template>
  <v-app dark>
    <Progress :show="show"/>
    <div v-show="browseSummitList.length!==0&&browseGlobalList.length!==0&&browseSongList.length!==0" class="main-container">
      <div class="section-title">Summit Lists</div>
      <AlbumsPicList :data="browseSummitList" type="list"/>
      <div class="section-title">Global Lists</div>
      <AlbumsPicList :data="browseGlobalList" type="list"/>
      <div class="section-title">Top Songs</div>
      <SongList ref="songList" :data="browseSongList" show-rank/>
    </div>
  </v-app>

</template>

<script>
import AlbumsPicList from '@/components/AlbumsPicList'
import Progress from '@/components/Progress'
import { getTopList, getMusicList } from '@/api/rank'
import SongList from '@/components/SongList'
import { createSong } from '@/components/js/song'
import { createList } from '@/components/js/album'

export default {
  components: { AlbumsPicList, SongList, Progress },
  data() {
    return {
      browseSummitList: [],
      browseGlobalList: [],
      browseSongList: [],
      show: true
    }
  },
  created() {
    this.getBrowseData()
  },
  methods: {
    getBrowseData() {
      getTopList().then(res => {
        res[0].List.forEach(item => {
          this.browseSummitList.push(createList(item))
        })
        res[1].List.forEach(item => {
          this.browseGlobalList.push(createList(item))
        })
        getMusicList(26).then(res => {
          const songList = (res.songlist).slice(0, 100)
          songList.forEach((item) => {
            this.browseSongList.push(createSong(item.data))
          })
          this.show = false
        })
      })
    }
  }
}
</script>

<style scoped>
  .section-title {
    cursor: default;
    line-height: normal;
    font-size: 24px;
    font-weight: 500;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 5px;
  }
</style>
