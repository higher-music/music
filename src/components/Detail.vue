<template>
  <v-app dark>
    <Progress v-show="show"/>
    <div v-show="data.songList.length&&data.btnColor" class="albums-container">
      <header>
        <div class="header-image-container">
          <img :src="data.img" :alt="data.name" class="header-image">
        </div>
        <div class="header">
          <div :style="{backgroundImage:`url(${data.img})`}" class="artwork"/>
          <div class="album-extras">
            <div class="track-text">
              <span class="album-name">{{ data.name }}</span>
              <!--<span class="album-detail" v-html="headerInfo.info"/>-->
            </div>
            <div class="album-button-container">
              <v-btn :color="data.btnColor" @click="playAll"> Play </v-btn>
              <v-btn :color="data.btnColor"> Shuffle</v-btn>
              <v-menu offset-y transition="scale-transition">
                <v-btn
                  slot="activator"
                  :color="data.btnColor"
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
          <SongList :data="data.songList" show-rank/>
        </div>
      </section>
    </div>
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title style="padding-bottom: 0">
          <span class="headline">{{ data.name }}</span>
        </v-card-title>
        <div style="padding: 24px" v-html="data.info"/>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="copySnackBar" :timeout="1500" bottom>
      Link copied to clipboard
    </v-snackbar>
  </v-app>
</template>

<script>
import Progress from '@/components/Progress'
import SongList from '@/components/SongList'
import { mapActions } from 'vuex'
import Clipboard from 'clipboard';

export default {
  components: { SongList, Progress },
  props: {
    data: {
      type: Object,
      default() {
        return {
          info: '',
          name: '',
          songList: [],
          img: '',
          btnColor: '#3399ff'
        }
      }
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialog: false,
      copySnackBar: false,
      items: [
        { title: 'Play Next' },
        { title: 'Play Later' },
        { title: 'Get Info' }
      ]
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
    menuClick(data, i){
      if (data.title === 'Get Info'){
        this.dialog = true
      }
    },
    playAll() {
      this.replacePlayList(this.data.songList)
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
          .album-button-container{
            .v-btn{
              margin: 0 8px 0 0;
              min-width: 68px;
              box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
            }
            .v-menu__activator{
              .v-btn{
                min-width: 24px;
                padding: 0 12px;
              }
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
