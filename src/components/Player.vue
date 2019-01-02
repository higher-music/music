<template>
  <div class="bg">
    <v-progress-linear
      :value="progress"
      class="my-0"
      height="3"
    />

    <v-list two-line dark>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title v-if="currentSong">{{ currentSong.name }}</v-list-tile-title>
          <v-list-tile-title v-else>暂无播放歌曲</v-list-tile-title>
          <v-list-tile-sub-title v-if="currentSong">{{ currentSong.singer }}</v-list-tile-sub-title>
          <v-list-tile-sub-title v-else>未知歌手</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-spacer/>

        <v-list-tile-action>
          <v-btn icon @click="prev">
            <v-icon>fast_rewind</v-icon>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
          <v-btn icon @click="play">
            <v-icon v-if="isPlay">pause</v-icon>
            <v-icon v-else>play_arrow</v-icon>
          </v-btn>
        </v-list-tile-action>

        <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
          <v-btn icon @click="next">
            <v-icon>fast_forward</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <audio id="audio" :src="playUrl" autoplay @timeupdate="updateTime">
      您的垃圾浏览器不支持audio标签，赶紧换了吧，还想听中国好声音么？
    </audio>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Player',
  data() {
    return {
      currentTime: 0,
      isPlay: true
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ]),
    progress() {
      let duration
      if (this.currentSong) {
        duration = document.getElementById('audio').duration
      } else {
        duration = 0
      }
      return Math.round(this.currentTime / duration * 100)
    },
    playUrl() {
      if (this.currentSong) {
        return this.currentSong.url
      }
      return ''
    }
  },
  methods: {
    ...mapActions([
      'nextSong',
      'prevSong'
    ]),
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    isPlay() {
      const player = document.getElementById('audio')
      if (this.currentSong) {
        return !player.paused;
      }
      return false
    },
    next() {
      this.nextSong()
    },
    prev() {
      this.prevSong()
    },
    play() {
      if (this.isPlay) {
        document.getElementById('audio').pause()
      } else {
        document.getElementById('audio').play()
      }
      this.isPlay = !this.isPlay
    }
  }
}
</script>

<style scoped>
.bg{
  width: 100%;
}
</style>
