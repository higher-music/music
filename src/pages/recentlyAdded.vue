<template>
  <main v-show="newAlbumsList.length!==0" class="main-container">
    <section class="section-title">Albums Lists</section>
    <PicList :data="newAlbumsList" type="album" />
    <section class="section-title">Songs Lists</section>
    <SongList :data="newSongList" style="padding: 0 20px" type="list"/>
  </main>
</template>
<script>
import PicList from '@/components/PicList'
import { getAlbumList } from '@/api/rank'
import { createAlbum } from '@/components/js/album'
import { createSong2 } from '@/components/js/song'
import SongList from '@/components/SongList'
import { getNewSong } from '@/api/song'

export default {
  name: 'RecentlyAdded',
  components: { PicList, SongList },
  data() {
    return {
      newSongList: [],
      newAlbumsList: []
    }
  },
  beforeCreate(){
    this.$loading.show()
  },
  created() {
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
