<template>
  <v-app dark>
    <Progress :show="show"/>
    <div v-show="browseAlbumsList.length!==0&&browseSongList.length!==0" class="main-container">
      <div class="section-title">Top Albums</div>
      <AlbumsPicList :data="browseAlbumsList"/>
      <div class="section-title">Top Songs</div>
      <SongList :data="browseSongList" show-rank/>
    </div>
  </v-app>

</template>

<script>
import AlbumsPicList from '@/components/AlbumsPicList'
import Progress from '@/components/Progress'
import { getTopList, getMusicList } from '@/api/rank'
import SongList from '@/components/SongList'
import { createSong } from '@/components/js/song';

export default {
  components: { AlbumsPicList, SongList, Progress },
  data() {
    return {
      browseAlbumsList: [],
      browseSongList: [],
      show: true
    }
  },
  created() {
    this.getBrowseData()
  },
  methods: {
    getBrowseData() {
      getTopList().then((res) => {
        this.browseAlbumsList = res.data.topList
      })

      getMusicList(26).then(res => {
        const songs = []
        const songList = (res.songlist).slice(0, 100)
        songList.forEach((item) => {
          songs.push(createSong(item.data))
        })
        this.browseSongList = songs
      })

      Promise.all([getTopList(), getMusicList()]).then(() => {
        setTimeout(() => {
          this.show = false
        }, 1500)
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
