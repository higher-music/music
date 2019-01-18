<template>
  <v-app dark>
    <Progress :show="show"/>
    <div v-show="browseSummitList.length!==0&&browseGlobalList.length!==0&&browseSongList.length!==0" class="main-container">
      <div class="section-title">Summit Lists</div>
      <AlbumsPicList :data="browseSummitList" type="list"/>
      <div class="section-title">Global Lists</div>
      <AlbumsPicList :data="browseGlobalList" type="list"/>
      <div class="section-title">Top Songs</div>
      <div class="top-songs-container">
        <SongList ref="songList" :data="browseSongList" show-rank/>
      </div>
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
      Promise.all([getTopList(), getMusicList(26)]).then(result => {
        result[0][0].List.forEach(t => {
          this.browseSummitList.push(createList(t))
        })
        result[0][1].List.forEach(t => {
          this.browseGlobalList.push(createList(t))
        })
        const songList = result[1].songlist.slice(0, 100)
        songList.forEach(t => {
          this.browseSongList.push(createSong(t.data))
        })
        this.show = false
      })
    }
  }
}
</script>

<style scoped>
  .top-songs-container{
    padding-left: 20px;
    padding-right: 20px;
  }
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
