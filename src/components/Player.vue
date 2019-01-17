<template>
  <div class="bg">
    <div class="show">
      <div class="img">
        <v-img v-if="currentSong" :src="currentSong.image" />
        <v-img v-else src="https://y.gtimg.cn/music/photo_new/T002R300x300M000001ZaCQY2OxVMg.jpg?max_age=2592000" />
      </div>
      <div class="title">
        <span v-if="currentSong" class="song">{{ currentSong.name }}</span>
        <span v-else class="song">Higher Music</span>
        <span v-if="currentSong" class="singer">{{ currentSong.singer }}</span>
      </div>
    </div>
    <div :style="'flex:' + flexSize" class="controller">
      <div class="btn">
        <v-btn icon @click="prevSong">
          <v-icon>skip_previous</v-icon>
        </v-btn>

        <v-btn icon @click="play">
          <v-icon v-if="isPlay">pause</v-icon>
          <v-icon v-else>play_arrow</v-icon>
        </v-btn>

        <v-btn icon @click="nextSong">
          <v-icon>skip_next</v-icon>
        </v-btn>
      </div>
      <v-slider
        :max="duration"
        v-model="currentTime"
        :height="3"
        class="hidden-sm-and-down"
        @mousedown="isFromUser = true "
        @mouseup="isFromUser = false"
        @change="slideChange"/>
    </div>
    <div class="hidden-sm-and-down setting">
      <Sheet/>
      <v-slider
        :max="1"
        :step="0.1"
        v-model="media"
        prepend-icon="volume_up"/>
    </div>

    <v-snackbar v-model="snackbar" :timeout="3000" bottom>
      该歌曲没有有效音质源
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <audio
      id="audio"
      :src="playUrl"
      :autoplay="autoplay"
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
  props: {
    autoplay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentTime: 0,
      duration: 0,
      isPlay: false,
      isFromUser: false,
      errorTimes: 0,
      snackbar: false,
      media: 0.5
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
    flexSize() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 1
        case 'sm': return 1
        default: return 4
      }
    },
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
  watch: {
    media() {
      document.getElementById('audio').volume = this.media
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

<style lang="scss" scoped>
.bg{
  width: 100%;
  display: flex;
  height: 80px;
  .show{
    display: flex;
    flex: 1;
    align-items: center;
    padding-left: 7px;
    margin: 0 5px 0 5px;
    .img{
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 5px;
    }
    .title{
      display: flex;
      flex-direction: column;
      margin-left: 17px;
      .song{
        font-size: 15px;
      }
      .singer{
        font-size: 10px;
        margin-top: 5px;
      }
    }
  }
  .controller{
    display: flex;
    flex-direction: column;
    margin: 0 5px 0 5px;
    padding: 10px 0 10px 0;
    .btn{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .setting{
    display: flex;
    margin: 0 5px 0 5px;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
}
</style>
