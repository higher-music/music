<template>
  <div v-show="browseSummitList.length!==0&&browseGlobalList.length!==0&&browseSongList.length!==0" class="main-container">
    <Scroll>
      <div class="scroll-container">
        <div class="section-title">Summit Lists</div>
        <PicList :data="browseSummitList" type="list"/>
        <div class="section-title">Global Lists</div>
        <PicList :data="browseGlobalList" type="list"/>
        <div class="section-title">Top Songs</div>
        <div class="top-songs-container">
          <SongList ref="songList" :data="browseSongList" show-rank/>
        </div>
      </div>
    </Scroll>
  </div>
</template>
<script>
import PicList from '@/components/PicList'
import { getTopList, getMusicList } from '@/api/rank'
import SongList from '@/components/SongList'
import { createSong } from '@/components/js/song'
import { createList } from '@/components/js/album'

export default {
  name: 'Browse',
  components: { PicList, SongList },
  data() {
    return {
      loading: true,
      browseSummitList: [],
      browseGlobalList: [],
      browseSongList: [],
      show: true
    }
  },
  created() {
    this.$loading.show()
    this.getBrowseData()
  },
  methods: {
    async getBrowseData() {
      const data = await Promise.all([getTopList(), getMusicList(26)])
      const [topList, musicList] = data
      const [browseSummitList, browseGlobalList] = topList
      browseSummitList.List.forEach(t => {
        this.browseSummitList.push(createList(t))
      })
      browseGlobalList.List.forEach(t => {
        this.browseGlobalList.push(createList(t))
      })
      const songList = musicList.songlist.slice(0, 10)
      songList.forEach(t => {
        this.browseSongList.push(createSong(t.data))
      })
      this.$loading.hide()
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
    padding-top: 12px;
  }
</style>
