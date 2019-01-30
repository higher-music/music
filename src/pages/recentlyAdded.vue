<template>
  <div v-show="newAlbumsList.length!==0" class="main-container">
    <div class="scroll-container">
      <div class="section-title">Albums Lists</div>
      <AlbumsPicList :data="newAlbumsList" type="album" />
      <div class="section-title">Songs Lists</div>
      <div class="top-songs-container">
        <SongList :data="newSongList" type="list" show-rank/>
      </div>
    </div>
  </div>
</template>
<script>
import AlbumsPicList from '@/components/AlbumsPicList'
import { getAlbumList } from '@/api/rank'
import { createAlbum } from '@/components/js/album'
import { createSong2 } from '@/components/js/song'
import SongList from '@/components/SongList'
import { getNewSong } from '@/api/song'

export default {
  name: 'RecentlyAdded',
  components: { AlbumsPicList, SongList },
  data() {
    return {
      newSongList: [],
      newAlbumsList: []
    }
  },
  created() {
    this.$loading.show()
    this.getNewData()
  },
  methods: {
    async getNewData(){
      const data = await Promise.all([
        getAlbumList(),
        getNewSong()
      ])
      const [albums, songs] = data
      albums.new_album.data.list.forEach(t => {
        this.newAlbumsList.push(createAlbum(t))
      })
      songs.new_song.data.song_list.forEach(t => {
        this.newSongList.push(createSong2(t))
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
