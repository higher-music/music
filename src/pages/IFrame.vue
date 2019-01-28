<template>
  <div class="iframe">
    <div class="all">
      <Progress :show="loading" />
      <header>
        <img
          v-if="currentSong"
          :src="currentSong.image"
          width="78"
          height="78">
        <img
          v-else
          src="static/img/default.jpeg"
          width="78"
          height="78">
        <div class="header-right">
          <div class="title-bar">
            <v-icon>audiotrack</v-icon>
            <span v-if="currentSong" style="margin-left: 10px;font-size: 14px">{{ currentSong.name }}</span>
            <span v-else style="margin-left: 10px;font-size: 14px">Higher Music</span>
          </div>
          <div class="controller">
            <span style="width: 50px;font-size: 11px;color: #999">{{ "- " + reverseTime }}</span>
            <div>
              <v-icon color="#898989" @click.stop="prevSong">skip_previous</v-icon>
              <v-icon v-if="isPlay" color="#898989" @click="play">pause</v-icon>
              <v-icon v-else color="#898989" @click="play">play_arrow</v-icon>
              <v-icon color="#898989" @click="nextSong">skip_next</v-icon>
            </div>
            <v-btn icon @click.stop="showList = !showList">
              <v-icon color="#898989">list</v-icon>
            </v-btn>
          </div>
        </div>
      </header>
      <div v-show="showList" class="content">
        <div
          v-for="(item, index) in list"
          :key="index"
          :style="index === currentIndex ? 'background: #e9e9e9' : ''"
          class="list-item"
          @click.stop="playIndex(index)">
          <div v-if="index === currentIndex"/>
          <span :class="{activeSpan: index === currentIndex}" class="span1">
            {{ index + 1 }}
          </span>
          <span class="span2">{{ item.name }}</span>
          <span class="span3">{{ item.singer }}</span>
        </div>
      </div>
      <footer v-show="showList">
        <v-icon>audiotrack</v-icon>
        <div style="padding-left: 5px;cursor: pointer">
          <a target="_blank" href="http://cyixlq.gitee.io/music/#/browse">Higher Music</a>
        </div>
        <v-spacer />
        <div style="cursor: pointer;padding-right: 10px">
          <a target="_blank" href="https://gitee.com/cyixlq/music">使用说明</a>
        </div>
      </footer>
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
        @durationchange="onDurationChange">
        您的垃圾浏览器不支持audio标签，赶紧换了吧，还想听中国好声音么？
        EN:Your fuck browser does not support audio tags, please replace them. Want to hear the good voice of China?
      </audio>
    </div>
  </div>
</template>

<script>
import { createSong3 } from '../components/js/song'
import { mapGetters, mapActions } from 'vuex'
import Progress from '@/components/Progress.vue'
import { formatDate } from '../components/js/utils'
import axios from 'axios'

export default {
  name: 'Iframe',
  components: {
    Progress
  },
  data() {
    return {
      list: [],
      loading: true,
      reverseTime: '',
      isPlay: false,
      showList: true,
      snackbar: false,
      duration: 0
    }
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'currentIndex',
      'playList',
      'haveNext'
    ]),
    autoplay() {
      return this.$route.params.autoplay === 'true';
    },
    playUrl() {
      if (this.currentSong) {
        return this.currentSong.mp3_128k
      }
      return ''
    }
  },
  created() {
    axios.get(`https://api.bzqll.com/music/tencent/songList?key=579621905&id=${this.$route.params.id}`).then(res => {
      res.data.data.songs.forEach(t => {
        this.list.push(createSong3(t))
        this.loading = false
        this.replacePlayList(this.list)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    ...mapActions([
      'addSongToCurrentIndex',
      'replacePlayList',
      'nextSong',
      'prevSong'
    ]),
    playIndex(index) {
      this.addSongToCurrentIndex(this.list[index])
    },
    updateTime(e) {
      this.reverseTime = formatDate(this.duration - e.target.currentTime)
    },
    onPlay() {
      document.title = `${this.currentSong.name} • ${this.currentSong.singer}`
      this.isPlay = true
      this.errorTimes = 0
    },
    onDurationChange() {
      this.duration = document.getElementById('audio').duration
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
    }
  }
}
</script>

<style lang="scss" scoped>
.iframe {
  background: #ffffff;
  height: 100vh;
  width: 100%;
  padding: 1vh;
  .all {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 98vh;
    color: #04060c;
    min-width: 290px;
    border-radius: 1vh;
    header {
      height: 78px;
      display: flex;
      box-shadow: 0px 0px 1px 1px #ccc;
      .header-right {
        flex: 1;
        display: flex;
        margin-left: 10px;
        flex-direction: column;
        justify-content: center;
        .title-bar {
          display: flex;
          align-items: center;
        }
        .controller {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
    .content {
      flex: 1;
      overflow-y: scroll;
      margin-top: 2px;
      box-shadow: 0px 1px 1px 1px #ccc;
      .list-item {
        display: flex;
        height: 30px;
        padding-right: 18px;
        align-items: center;
        cursor: pointer;
        div {
          height: 22px;
          background: #df2d2d;
          width: 3px;
          float: left;
        }
        .span1 {
          width: 40px;
          text-align: center;
        }
        .activeSpan {
          margin-left: -3px;
        }
        .span2 {
          flex: 2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .span3 {
          flex: 1;
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          padding-left: 10px;
          text-overflow: ellipsis;
        }
      }
      .list-item:nth-child(odd) {
        background: #f7f7f7;
      }
      .list-item:hover {
        background: #eaeaea;
      }
    }
    footer {
      box-shadow: 0px 1px 1px 1px #ccc;
      display: flex;
      align-items: center;
      background: #f1f1f1;
      height: 40px;
      a {
        text-decoration: none;
        color: #04060c;
      }
    }
  }
}
</style>
