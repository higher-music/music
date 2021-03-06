<template>
  <div class="song-list-container">
    <Progress :show="loading"/>
    <div
      v-for="(item,index) in data"
      :class="{activeSongBG:currentSong && item.id === currentSong.id}"
      :key="index"
      class="song-list-wapper">
      <div class="song-list">
        <div v-if="showRank">
          <div v-if="currentSong && item.id === currentSong.id" class="rank">
            <v-icon>play_circle_outline</v-icon>
          </div>
          <div v-else class="rank">{{ index + 1 }}</div>
        </div>
        <img
          v-lazy="item.image"
          v-if="showAlbum"
          :alt="item.name"
          :title="item.name"
          @click="playIndex(index)">
        <div class="track-info" @click="playIndex(index)">
          <div class="song-name-container">
            <span
              :class="{activeSong:currentSong && item.id === currentSong.id}"
              class="text-truncate">{{ item.name }}</span>
          </div>
          <div class="secondary-info">
            <span v-for="(one, i) in item.singer" :key="i" class="text-truncate">
              {{ one.name }}
              <span v-if="i !== item.singer.length - 1">•&nbsp;</span>
            </span>
          </div>
        </div>
        <v-btn slot="activator" :ripple="false" :class="menuClass" dark icon @click="menuBtnClick($event,index)">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </div>
    </div>
    <Sheet ref="downloadSheet" type="download"/>
    <v-menu
      :position-x="x"
      :position-y="y"
      v-model="show"
      min-width="110px"
      offset-x
      left
      absolute
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in menu"
          :key="i"
          @click="menuClick(i)">
          <v-list-tile-title class="body-2">{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import Progress from '@/components/Progress'
import Sheet from '@/components/Sheet'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SongList',
  components: { Progress, Sheet },
  props: {
    showRank: {
      type: Boolean,
      default: false
    },
    showAlbum: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      x: 0,
      y: 0,
      index: -1,
      menu: [
        { title: 'Play Next' },
        { title: 'Play Later' },
        { title: 'Download' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ]),
    menuClass(){
      if (this.$vuetify.breakpoint.name === 'xs') return 'menu_flex'
      else return 'menu'
    }
  },
  methods: {
    ...mapActions([
      'addSongToCurrentIndex',
      'addSongToNext',
      'addSongToLast'
    ]),
    playIndex(index) {
      this.addSongToCurrentIndex(this.data[index])
    },
    menuBtnClick(e, index) {
      e.preventDefault();
      this.x = e.clientX;
      this.y = e.clientY;
      this.show = true;
      this.index = index
    },
    menuClick(i) {
      if (i === 0) {
        this.playNext()
      } else if (i === 1) {
        this.playLatter()
      } else {
        if (this.index < 0) {
          return false
        }
        this.$refs.downloadSheet.sheet = true;
        this.$refs.downloadSheet.resource = this.data[this.index]
        // this.$refs.downloadSheet.initDownload()
      }
    },
    playNext() {
      this.addSongToNext(this.data[this.index])
    },
    playLatter() {
      this.addSongToLast(this.data[this.index])
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-list{
    background: #000000 !important;
  }
  .song-list-container {
    box-sizing: content-box !important;
    .song-list-wapper {
      display: flex;
      height: 60px;
      border-radius: 5px;
      cursor: pointer;
      .song-list {
        overflow: hidden;
        display: flex;
        flex: 1;
        align-items: center;
        &:hover {
          background-color: rgba(255, 255, 255, .04);
          .menu {
            display: flex;
          }
        }
        .rank {
          text-align: center;
          width: 20px;
          padding-left: 10px;
          font-weight: 600;
        }
        img {
          margin-right: 10px;
          height: 40px;
          width: 40px;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(0, 0, 0, .5);
          margin-left: 10px;
        }
        .menu {
          display: none;
        }
        .menu_flex {
          display: flex;
        }
        .track-info {
          height: 40px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .song-name-container {
            display: flex;
            align-items: center;
            span {
              font-size: 16px;
            }
          }
          .secondary-info {
            display: flex;
            span {
              color: #b3b3b3;
              font-size: 14px;
            }
          }
        }
      }
    }
    .activeSongBG {
      background-color: rgba(0, 0, 0, 0.3);
    }
    .activeSong {
      color: rgb(105, 240, 174);
    }
  }
</style>
