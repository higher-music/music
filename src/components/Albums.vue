<template>
  <v-app dark>
    <Progress v-show="show"/>
    <div v-show="songList.length&&btnColor" class="albums-container">
      <header>
        <div class="header-image-container">
          <img :src="headerInfo.pic_album" :alt="headerInfo.ListName" class="header-image">
        </div>
        <div class="header">
          <div :style="{backgroundImage:`url(${headerInfo.pic_album})`}" class="artwork"/>
          <div class="album-extras">
            <div class="track-text">
              <span class="album-name">{{ headerInfo.ListName }}</span>
              <!--<span class="album-detail" v-html="headerInfo.info"/>-->
            </div>
            <div class="album-button-container">
              <v-btn :color="btnColor" @click="playAll"> Play</v-btn>
              <v-btn :color="btnColor"> Shuffle</v-btn>
              <v-menu offset-y transition="scale-transition">
                <v-btn
                  slot="activator"
                  :color="btnColor"
                  dark
                >
                  <v-icon>more_horiz</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile
                    v-for="(item, i) in items"
                    :key="i"
                    @click="menuClick(item, i)">
                    <v-list-tile-title class="body-2">{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
                <v-list>
                  <v-list-tile ref="copy" @click="copyLink">
                    <v-list-tile-title class="body-2">Copy Link</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div class="tracklist">
          <SongList :data="songList" show-rank/>
        </div>
      </section>
    </div>
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title style="padding-bottom: 0">
          <span class="headline">{{ headerInfo.ListName }}</span>
        </v-card-title>
        <div style="padding: 24px" v-html="headerInfo.info"/>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="copySnackBar" :timeout="1500" bottom>
      Link copied to clipboard
    </v-snackbar>
  </v-app>
</template>

<script>
import Progress from '@/components/Progress'
import { createSong } from '@/components/js/song';
import { getMusicList } from '@/api/rank'
import SongList from '@/components/SongList'
import { mapActions } from 'vuex'
import RGBaster from 'rgbaster'
import Clipboard from 'clipboard';

export default {
  components: { SongList, Progress },
  data() {
    return {
      headerInfo: [],
      dialog: false,
      songList: [],
      copySnackBar: false,
      btnColor: null,
      show: true,
      items: [
        { title: 'Play Next' },
        { title: 'Play Later' },
        { title: 'Get Info' }
      ]
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(to, from) {
        this.$nextTick(() => {
          this.getRankList(to)
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'replacePlayList'
    ]),
    copyLink() {
      const copy = this.$refs.copy.$el
      const clipboard = new Clipboard(copy, {
        text: (trigger) => {
          return `${location.href}`;
        }
      });
      clipboard.on('success', (e) => {
        this.copySnackBar = true
        clipboard.destroy()
      });
      clipboard.on('error', (e) => {
        clipboard.destroy()
      });
    },
    getRankList(data) {
      getMusicList(data.params.id).then(res => {
        this.getImageColor(res.topinfo.pic_album).then(res => {
          this.btnColor = res
        }).then(() => {
          this.headerInfo = res.topinfo
          const songs = []
          const songList = (res.songlist).slice(0, 100)
          songList.forEach((item) => {
            songs.push(createSong(item.data))
          })
          this.songList = songs
          this.show = false
        })
      })
    },
    // 获取图片主题色
    getImageColor(img) {
      return new Promise((resolve, reject) => {
        // canvas不允许获取跨域资源的数据，利用服务器代理的方法，解决跨域问题。
        const URl = `http://74.82.206.121:8888/api/img?0=${img}`;
        RGBaster.colors(URl, {
          // 调色板大小
          paletteSize: 50,
          exclude: ['rgb(255,255,255)', 'rgb(0,0,0)'],
          success: function(payload) {
            const c = payload.dominant.match(/\d+/g);
            resolve(`rgb(${c[0]},${c[1]},${c[2]})`)
          }
        });
      })
    },
    menuClick(data, i){
      if (data.title === 'Get Info'){
        this.dialog = true
      }
    },
    playAll() {
      this.replacePlayList(this.songList)
    }
  }
}
</script>

<style lang="scss" scoped>
  .albums-container {
    background-color: #000;
    height: 100%;
    overflow-x: hidden;
    -webkit-perspective: 1px;
    perspective: 1px;
    -webkit-perspective-origin: center top;
    perspective-origin: center top;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-animation: .7s fadein;
    animation: .7s fadein;
    header {
      min-height: 190px;
      max-height: 300px;
      height: 50%;
      position: relative;
      vertical-align: top;
      -webkit-transform-origin: center top;
      transform-origin: center top;
      -webkit-transform: translateZ(-.6px) scale(1.6);
      transform: translateZ(-.6px) scale(1.6);
      .header-image-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        background-color: #000;
        .header-image {
          width: 100%;
          height: 100%;
          -o-object-position: center 30%;
          object-position: center 30%;
          -o-object-fit: cover;
          object-fit: cover;
          opacity: .45;
        }
      }
      .header {
        position: absolute;
        height: 100%;
        display: flex;
        align-items: flex-end;
        .artwork {
          background-size: cover;
          min-width: 170px;
          height: 170px;
          margin: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, .5);
          border-radius: 4px;
        }
        .album-extras {
          display: flex;
          flex-direction: column;
          padding-bottom: 10px;
          margin-left: 5px;
          .track-text {
            line-height: normal;
            display: flex;
            flex-direction: column;
            padding-bottom: 12px;
            cursor: default;
            .album-name {
              font-weight: 500;
              font-size: 38px;
            }
            .album-detail {
              color: #b3b3b3;
              padding-top: 3px;
            }
          }
        }
      }
    }
    section {
      box-shadow: 0 0 20px 0 #000;
      background-image: linear-gradient(#04060c, #1e3264 120%);
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      min-height: calc(100% - 300px);
      .tracklist {
        padding: 10px;
      }
    }
  }

</style>
