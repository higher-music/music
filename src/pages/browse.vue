<template>
  <main v-show="show" class="main-container">
    <section class="section-title">Summit Lists</section>
    <PicList :data="browseSummitList" type="list"/>
    <section class="section-title">Global Lists</section>
    <PicList :data="browseGlobalList" type="list"/>
    <section class="section-title">Top Songs</section>
    <SongList :data="browseSongList" style="padding: 0 20px" show-rank/>
  </main>
</template>
<script>
import PicList from '@/components/PicList'
import { getMusicList, getTopList } from '@/api/rank'
import SongList from '@/components/SongList'
import { createSong } from '@/api/format/song'
import { createList } from '@/api/format/album'

export default {
  name: 'Browse',
  components: { PicList, SongList },
  data() {
    return {
      browseSummitList: [],
      browseGlobalList: [],
      browseSongList: []
    }
  },
  computed: {
    show(){
      return this.browseSummitList.length !== 0 && this.browseGlobalList.length !== 0 && this.browseSongList.length !== 0
    }
  },
  created() {
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
    }
  }
}
</script>
