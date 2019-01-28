<template>
  <div class="main-container">
    <div class="section-title">
      New Songs
      <v-spacer/>
      <v-btn dark flat small @click.stop="playAll">
        PlayAll
      </v-btn>
    </div>
    <hr>
    <div class="scroll-container2">
      <SongList :data="songList" type="list" show-rank/>
    </div>
  </div>
</template>

<script>
import SongList from '@/components/SongList'
import { getNewSong } from '@/api/song'
import { createSong2 } from '@/components/js/song'
import { mapActions } from 'vuex'

export default {
  name: 'Songs',
  components: { SongList },
  data() {
    return {
      songList: []
    }
  },
  created() {
    this.$loading.show()
    getNewSong().then(res => {
      res.new_song.data.song_list.forEach(t => {
        this.songList.push(createSong2(t))
        this.$loading.hide()
      })
    })
  },
  methods: {
    ...mapActions([
      'replacePlayList'
    ]),
    playAll() {
      this.replacePlayList(this.songList)
    }
  }
}
</script>

<style scoped>
  .section-title {
    display: flex;
    cursor: default;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
    padding: 10px;
  }
  .scroll-container2{
    position: relative;
    z-index: 1;
    display: block;
    -webkit-overflow-scrolling: touch;
    height:  calc(100% - 60px);
    overflow: auto;
  }
</style>
