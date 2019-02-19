<template>
  <div class="main-container">
    <Scroll>
      <div v-show="data.songList.length&&data.btnColor" class="detail-container">
        <header>
          <div class="header-image-container">
            <img :src="data.img" :alt="data.name" class="header-image">
          </div>
          <div class="header">
            <div :style="{backgroundImage:`url(${data.img})`}" class="artwork"/>
            <div class="album-extras">
              <div class="track-text">
                <span class="album-name">{{ data.name }}</span>
                <div>
                  <span :class="{ linkable:data.singername}" class="artist-name" @click="toSinger(data)">{{ data.singername }}</span>
                </div>
              </div>
              <div class="album-button-container">
                <v-btn :class="{'black--text': data.diffColor}" :color="data.btnColor" class="text-capitalize" @click.stop="playAll(false)"> play </v-btn>
                <v-btn :class="{'black--text': data.diffColor}" :color="data.btnColor" class="text-capitalize" @click.stop="playAll(true)"> shuffle</v-btn>
                <v-menu offset-y transition="scale-transition">
                  <v-btn
                    slot="activator"
                    :class="{'black--text': data.diffColor}"
                    :color="data.btnColor"
                    dark
                  >
                    <v-icon>more_horiz</v-icon>
                  </v-btn>
                  <v-list :class="{'black--text': data.diffColor}" :style="{backgroundColor: `${data.btnColor}`}">
                    <v-list-tile
                      v-for="(item, i) in items"
                      :key="i"
                      @click="menuClick(item)">
                      <v-list-tile-title class="body-2">{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                  <v-list :class="{'black--text': data.diffColor}" :style="{backgroundColor: `${data.btnColor}`}">
                    <v-list-tile ref="copy" @click="copyLink">
                      <v-list-tile-title class="body-2">Copy Link</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </div>
        </header>
        <section :style="{backgroundImage:`linear-gradient(rgb(4, 6, 12), ${data.btnColor} 180%)` }">
          <div class="tracklist">
            <SongList :data="data.songList" show-rank/>
          </div>
        </section>
        <v-dialog v-model="dialog" width="700">
          <v-card :class="{'black--text': data.diffColor}" :color="data.btnColor">
            <v-card-title style="padding-bottom: 0">
              <span class="headline">{{ data.name }}</span>
            </v-card-title>
            <div style="padding: 24px;" v-html="data.info"/>
          </v-card>
        </v-dialog>
        <v-snackbar v-model="copySnackBar" :timeout="1500" bottom>
          Link copied to clipboard
        </v-snackbar>
      </div>
    </Scroll>
  </div>
</template>

<script>
import SongList from '../components/SongList'
import { mapActions } from 'vuex'
import Clipboard from 'clipboard'
import { RANDOM } from '../api/config'

export default {
  name: 'Detail',
  components: { SongList },
  props: {
    data: Object
  },
  data() {
    return {
      dialog: false,
      copySnackBar: false,
      items: [
        { title: 'Play Later' },
        { title: 'Get Info' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'replacePlayList',
      'contactPlayList',
      'changePlayType'
    ]),
    toSinger(item) {
      this.$router.push('/singer/' + item.singermid)
    },
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
    menuClick(data){
      switch (data.title) {
        case 'Get Info':
          this.dialog = true
          break
        case 'Play Later':
          this.contactPlayList(this.data.songList)
          break
        default:
          break
      }
    },
    playAll(isShuffle) {
      this.replacePlayList(this.data.songList)
      if (isShuffle) {
        this.changePlayType(RANDOM)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-container {
    background-color: #000;
    overflow: hidden;
    perspective: 1px;
    /*-webkit-overflow-scrolling: touch;*/
    perspective-origin: center top;
    transform-style: preserve-3d;
    animation: .7s fadein;
    header {
      height: 300px;
      position: relative;
      vertical-align: top;
      transform-origin: center top;
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
          object-position: center 30%;
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
            .artist-name{
              font-size: 18px;
              font-weight: 500;
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
      transform: translateZ(0);
      min-height: calc(100vh - 400px);
      .tracklist {
        padding: 10px;
      }
    }
  }

</style>
