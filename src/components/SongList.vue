<template>
  <div class="song-list-container">
    <Progress :show="loading"/>
    <div v-for="(item,index) in data" :class="{activeSongBG:currentSong && item.id === currentSong.id}" :key="index" class="song-list-wapper">
      <div class="song-list">
        <div v-if="showRank">
          <div v-if="currentSong && item.id === currentSong.id" class="rank"><v-icon>play_circle_outline</v-icon></div>
          <div v-else class="rank">{{ index + 1 }}</div>
        </div>
        <v-img
          v-if="showAlbum"
          :src="item.image"
          :alt="item.name"
          :max-width="40"
          :max-height="40"
          class="image"
          lazy-src="static/img/default.jpeg"
          @click="playIndex(index)" />
        <div class="track-info" @click="playIndex(index)">
          <div class="song-name-container">
            <span :class="{activeSong:currentSong && item.id === currentSong.id}" class="text-truncate">{{ item.name }}</span>
          </div>
          <div class="secondary-info">
            <span v-for="(one, i) in item.singer" :key="i">
              {{ one.name }}
              <span v-if="i !== item.singer.length - 1">•&nbsp;</span>
            </span>
          </div>
        </div>
        <v-menu v-if="showMenu" :class="menuClassName" offset-y>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, i) in items"
              :key="i"
              @click="menuClick(index, i)">
              <v-list-tile-title class="body-2">{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from '@/components/Progress.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { Progress },
  props: {
    showRank: {
      type: Boolean,
      default: false
    },
    showAlbum: {
      type: Boolean,
      default: true
    },
    showMenu: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data(){
    return {
      items: [
        { title: 'Play Next' },
        { title: 'Play Later' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ]),
    menuClassName() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'menu_flex'
        case 'sm': return 'menu_flex'
        default: return 'menu'
      }
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
    menuClick(index, i) {
      if (i === 0) {
        this.playNext(index)
      } else {
        this.playLatter(index)
      }
    },
    playNext(index) {
      this.addSongToNext(this.data[index])
    },
    playLatter(index) {
      this.addSongToLast(this.data[index])
    }
  }
}
</script>

<style lang="scss" scoped>
  .song-list-container{
    box-sizing: content-box !important;
    .song-list-wapper {
      display: flex;
      height: 60px;
      border-radius: 5px;
      cursor: pointer;
      .song-list{
        overflow: hidden;
        display: flex;
        flex: 1;
        align-items: center;
        &:hover{
          background-color: rgba(255,255,255,.04);
          .menu{
            display: flex;
          }
        }
        .rank{
          text-align: center;
          width: 20px;
          padding-left: 10px;
          font-weight: 600;
        }
        .image{
          margin-right: 10px;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(0,0,0,.5);
          margin-left: 10px;
        }
        .menu {
          display: none;
        }
        .menu_flex {
          display: flex;
        }
        .track-info{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          display: flex;
          flex-direction: column;
          .song-name-container{
            display: flex;
            align-items: center;
            span{
              font-size: 16px;
            }
          }
          .secondary-info{
            display: flex;
            span{
              color: #b3b3b3;
              font-size: 14px;
            }
          }
        }
      }
    }
    .activeSongBG{
      background-color: rgba(0, 0, 0, 0.3);
    }
    .activeSong{
      color: rgb(105, 240, 174);
    }
  }
</style>
