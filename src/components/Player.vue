<template>
  <div class="footer-container">
    <div class="track-info">
      <div class="album-artwork">
        <v-img v-if="currentSong" :src="currentSong.image" lazy-src="static/img/default.jpeg"/>
        <v-img v-else src="static/img/default.jpeg"/>
      </div>
      <div class="track-text">
        <div v-if="currentSong" class="track-title">
          {{ currentSong.name }}
        </div>
        <div v-else class="track-title">
          Higher Music
        </div>
        <div v-if="currentSong" class="track-artist">
          <span v-for="(one, i) in currentSong.singer" :key="i" @click.stop="toSinger(one)">
            {{ one.name }}
            <span v-if="i !== currentSong.singer.length - 1">•&nbsp;</span>
          </span>
        </div>
      </div>
    </div>
    <div class="playback-controls">
      <div class="playback-buttons">
        <v-btn icon class="hidden-sm-and-down" @click="prevSong">
          <v-icon>skip_previous</v-icon>
        </v-btn>
        <v-btn v-if="currentSong" :loading="loading" icon @click="play">
          <v-icon v-if="isPlay">pause</v-icon>
          <v-icon v-else>play_arrow</v-icon>
        </v-btn>
        <v-btn v-else icon @click="play">
          <v-icon v-if="isPlay">pause</v-icon>
          <v-icon v-else>play_arrow</v-icon>
        </v-btn>
        <v-btn icon @click="nextSong">
          <v-icon>skip_next</v-icon>
        </v-btn>
      </div>
      <div class="scrubber">
        <div class="time hidden-sm-and-down">{{ currentTimeStr }}</div>
        <v-slider
          :max="duration"
          v-model="currentTime"
          :height="3"
          color="#69f0ae"
          class="hidden-sm-and-down"
          @mousedown="isFromUser = true "
          @mouseup="isFromUser = false"
          @change="slideChange"/>
        <div class="time hidden-sm-and-down">{{ durationStr }}</div>
      </div>
    </div>
    <div class="misc-controls hidden-sm-and-down">
      <Sheet class="hidden-md-and-down"/>
      <v-btn icon class="hidden-md-and-down" @click.stop="$emit('list-click')">
        <v-icon>queue_music</v-icon>
      </v-btn>
      <v-btn icon class="hidden-md-and-down" @click.stop="changePlayMode">
        <v-icon v-if="getPlayType === 1">repeat</v-icon>
        <v-icon v-else-if="getPlayType === 2">shuffle</v-icon>
        <v-icon v-else>repeat_one</v-icon>
      </v-btn>
      <v-flex xs4 class="hidden-md-and-down" style="display: flex;align-items: center">
        <v-btn icon @click.stop="media = media === 0 ? 1 : 0">
          <v-icon v-if="media > 0">volume_up</v-icon>
          <v-icon v-else>volume_off</v-icon>
        </v-btn>
        <v-slider
          :max="1"
          :step="0.1"
          v-model="media"
          color="#69f0ae"/>
      </v-flex>
    </div>
    <audio
      id="audio"
      :src="playUrl"
      :loop="isLoop"
      @timeupdate="updateTime"
      @ended="end"
      @pause="isPlay = false"
      @loadstart="loadStart"
      @loadedmetadata="loadEdmetaData"
      @play="onPlay"
      @error="onError"
      @durationchange="onDurationChange">
      您的垃圾浏览器不支持audio标签，赶紧换了吧，还想听中国好声音么？
      EN:Your fuck browser does not support audio tags, please replace them. Want to hear the good voice of China?
    </audio>
    <v-snackbar v-model="snackbar" :timeout="3000" bottom>
      该歌曲没有有效音质源
      <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Sheet from '@/components/Sheet'
import { mapGetters, mapActions } from 'vuex'
import { ORDER, RANDOM, SINGLE, FLAC, MP3_320K, MP3_128K } from '@/api/config'
import { formatDate } from '@/components/js/utils'

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
      snackbar: false,
      media: 1,
      loading: true,
      timer: null
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'haveNext',
      'currentIndex',
      'playList',
      'getType',
      'getPlayType'
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
    },
    isLoop() {
      return this.getPlayType === SINGLE
    },
    currentTimeStr() {
      if (this.currentTime > 0) {
        return formatDate(this.currentTime)
      }
      return '00:00'
    },
    durationStr() {
      if (this.duration > 0) {
        return formatDate(this.duration)
      }
      return '00:00'
    }
  },
  watch: {
    media() {
      document.getElementById('audio').volume = this.media
    },
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (oldSong && newSong.id === oldSong.id) {
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        document.getElementById('audio').play()
      }, 1000)
    }
  },
  methods: {
    ...mapActions([
      'nextSong',
      'prevSong',
      'changeIndex',
      'changePlayType'
    ]),
    loadStart(){
      this.loading = true
    },
    loadEdmetaData(){
      this.loading = false
    },
    updateTime(e) {
      if (!this.isFromUser) {
        this.currentTime = e.target.currentTime
      }
    },
    onPlay() {
      let singer = ''
      this.currentSong.singer.forEach(t => {
        singer += t.name + ' '
      })
      document.title = `${this.currentSong.name} • ${singer}`
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
    onDurationChange() {
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
    },
    changePlayMode() {
      switch (this.getPlayType) {
        case ORDER:
          this.changePlayType(RANDOM)
          break
        case RANDOM:
          this.changePlayType(SINGLE)
          break
        default:
          this.changePlayType(ORDER)
          break
      }
    },
    toSinger(item) {
      this.$router.push('/singer/' + item.mid)
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer-container {
    box-sizing: inherit !important;
    width: 100%;
    height: 100px;
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    .track-info {
      width: 30%;
      display: flex;
      align-items: center;
      .album-artwork {
        height: 60px;
        min-width: 60px;
        width: 60px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        border-radius: 5%;
        margin-right: 10px;
        background-size: cover;
      }
      .track-text {
        width: 100%;
        cursor: default;
        overflow: hidden;
        white-space: nowrap;
        line-height: normal;
        padding-right: 10%;
        .track-title {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .track-artist {
          cursor: pointer;
          font-size: 14px;
          color: #b3b3b3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .playback-controls {
      width: 40%;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .playback-buttons {
        display: flex;
        justify-content: center;
      }
      .scrubber{
        display: flex;
        width: 100%;
        align-items: center;
        .time{
          font-size: 11px;
          color: #b3b3b3;
        }
      }
    }
    .misc-controls {
      width: 30%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    @media screen and (max-width: 599.99px) and (orientation: portrait), (max-width: 959.99px) and (orientation: landscape) {
      .track-info {
        flex: 1;
      }
      .playback-controls{
        width: unset;
        flex: unset;
      }
    }
  }

  /*.bg{*/
  /*width: 100%;*/
  /*display: flex;*/
  /*height: 80px;*/
  /*.show{*/
  /*display: flex;*/
  /*flex: 1;*/
  /*align-items: center;*/
  /*padding-left: 7px;*/
  /*margin: 0 5px 0 5px;*/
  /*.img{*/
  /*width: 50px;*/
  /*height: 50px;*/
  /*overflow: hidden;*/
  /*border-radius: 5px;*/
  /*}*/
  /*.title{*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*margin-left: 17px;*/
  /*.song{*/
  /*font-size: 15px;*/
  /*}*/
  /*.singer{*/
  /*font-size: 10px;*/
  /*margin-top: 5px;*/
  /*}*/
  /*}*/
  /*}*/
  /*.controller{*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*margin: 0 5px 0 5px;*/
  /*padding: 10px 0 10px 0;*/
  /*.btn{*/
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  /*}*/
  /*}*/
  /*.setting{*/
  /*display: flex;*/
  /*margin: 0 5px 0 5px;*/
  /*flex: 1;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*padding: 10px;*/
  /*}*/
  /*}*/
</style>
