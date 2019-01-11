<template>
  <div class="bg">
    <v-list two-line dark>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-img v-if="currentSong" :src="currentSong.image" />
          <v-img v-else src="https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg?max_age=2592000" />
        </v-list-tile-avatar>
        <v-list-tile-content width="20%">
          <v-list-tile-title v-if="currentSong">{{ currentSong.name }}</v-list-tile-title>
          <v-list-tile-title v-else>暂无播放歌曲</v-list-tile-title>
          <v-list-tile-sub-title v-if="currentSong">{{ currentSong.singer }}</v-list-tile-sub-title>
          <v-list-tile-sub-title v-else>未知歌手</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-slider
          :max="duration"
          :value="currentTime"
          :height="3"
          class="hidden-sm-and-down"
          @mousedown="isFromUser = true "
          @mouseup="isFromUser = false"
          @change="slideChange"/>
        <Sheet style="margin-left: 30px" class="hidden-sm-and-down"/>
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
    <v-snackbar v-model="snackbar" :timeout="3000" bottom>
      该歌曲没有有效音质源
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <audio
      id="audio"
      :src="playUrl"
      autoplay
      @timeupdate="updateTime"
      @ended="end"
      @pause="isPlay = false"
      @play="onPlay"
      @error="onError"
      @canplay="onCanPlay">
      您的垃圾浏览器不支持audio标签，赶紧换了吧，还想听中国好声音么？
      EN:Your fuck browser does not support audio tags, please replace them. Want to hear the good voice of China?
    </audio>
  </div>
</template>

<script>
import Sheet from '@/components/Sheet'
import { FLAC, MP3_320K, MP3_128K } from '@/components/js/utils'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Player',
  components: { Sheet },
  data() {
    return {
      currentTime: 0,
      duration: 0,
      isPlay: false,
      isFromUser: false,
      errorTimes: 0,
      snackbar: false
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'haveNext',
      'currentIndex',
      'playList',
      'getType'
    ]),
    playUrl() {
      if (this.currentSong) {
        let playUrl
        switch (this.getType) {
          case FLAC:
            playUrl = this.currentSong.flac
            break
          case MP3_320K:
            playUrl = this.currentSong.mp3_320k
            break
          case MP3_128K:
            playUrl = this.currentSong.mp3_128k
            break
          default:
            break
        }
        return playUrl
      }
      return ''
    }
  },
  methods: {
    ...mapActions([
      'nextSong',
      'prevSong',
      'changeIndex'
    ]),
    updateTime(e) {
      if (!this.isFromUser) {
        this.currentTime = e.target.currentTime
      }
    },
    onPlay() {
      this.isPlay = true
      this.errorTimes = 0
    },
    play() {
      if (this.isPlay) {
        document.getElementById('audio').pause()
      } else {
        if (this.currentIndex < 0 && this.playList.length > 0) {
          this.changeIndex(0)
        } else {
          document.getElementById('audio').play()
        }
      }
    },
    end() {
      if (this.haveNext) {
        this.nextSong()
      } else {
        document.getElementById('audio').pause()
      }
    },
    onCanPlay() {
      this.duration = document.getElementById('audio').duration
    },
    onError() {
      this.isPlay = false
      // 如果当前有歌曲在播放
      if (this.currentSong) {
        switch (this.errorTimes) {
          case 0:
            console.log('尝试无损音质播放')
            document.getElementById('audio').src = this.currentSong.flac
            this.errorTimes = 1
            break
          case 1:
            console.log('尝试高音质播放')
            document.getElementById('audio').src = this.currentSong.mp3_320k
            this.errorTimes = 2
            break
          case 2:
            console.log('尝试普通音质播放')
            document.getElementById('audio').src = this.currentSong.mp3_128k
            this.errorTimes = 3
            break
          default:
            this.snackbar = true
            this.end()
            break
        }
      } else {
        this.errorTimes = 0
      }
    },
    slideChange(i) {
      if (!this.isFromUser) {
        document.getElementById('audio').currentTime = i
      }
    }
  }
}
</script>

<style scoped>
.bg{
  width: 100%;
}
</style>
