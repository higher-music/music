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
          <v-btn icon @click="prevSong">
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
          <v-btn icon @click="nextSong">
            <v-icon>fast_forward</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <audio
      id="audio"
      :src="playUrl"
      autoplay
      @timeupdate="updateTime"
      @ended="end"
      @pause="onPause"
      @play="onPlay">
      您的垃圾浏览器不支持audio标签，赶紧换了吧，还想听中国好声音么？
      EN:Your fuck browser does not support audio tags, please replace them. Want to hear the good voice of China?
    </audio>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Player',
  data() {
    return {
      currentTime: 0,
      isPlay: false
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'haveNext'
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
    play() {
      if (this.isPlay) {
        document.getElementById('audio').pause()
      } else {
        document.getElementById('audio').play()
      }
    },
    end() {
      if (this.haveNext) {
        this.nextSong()
      } else {
        document.getElementById('audio').pause()
      }
    },
    onPause() {
      this.isPlay = false
    },
    onPlay() {
      this.isPlay = true
    }
  }
}
</script>

<style scoped>
.bg{
  width: 100%;
}
</style>
