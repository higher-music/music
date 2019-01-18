<template>
  <v-app dark>
    <Progress :show="show"/>
    <div class="section-title">
      New Songs
      <v-spacer/>
      <v-btn dark flat small @click.stop="playAll">
        PlayAll
      </v-btn>
    </div>
    <hr>
    <SongList :data="songList" type="list" show-rank/>
  </v-app>
</template>

<script>
import Progress from '@/components/Progress'
import SongList from '@/components/SongList'
import { getNewSong } from '@/api/song'
import { createSong2 } from '@/components/js/song'
import { mapActions } from 'vuex'

export default {
  name: 'Songs',
  components: { SongList, Progress },
  data() {
    return {
      show: true,
      songList: []
    }
  },
  created() {
    getNewSong().then(res => {
      res.new_song.data.song_list.forEach(t => {
        this.songList.push(createSong2(t))
        this.show = false
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
</style>
