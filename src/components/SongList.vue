<template>
  <div class="song-list-container">
    <Progress v-show="loading"/>
    <div v-for="(item,index) in data" :key="index" class="song-list-wapper" @mouseover="mouseover(index)">
      <div class="song-list">
        <div v-if="showRank">
          <div v-if="currentSong && item.id === currentSong.id" class="rank"><v-icon>play_circle_outline</v-icon></div>
          <div v-else class="rank">{{ index + 1 }}</div>
        </div>
        <img
          v-if="showAlbum"
          :src="item.image"
          :alt="item.name"
          :title="item.name"
          @click="playIndex(index)">
        <div class="track-info" @click="playIndex(index)">
          <div class="song-name-container">
            <span>{{ item.name }}</span>
          </div>
          <div class="secondary-info">
            <span>{{ item.singer }}</span>
          </div>
        </div>
        <v-menu v-if="showMenu" :class="menuClassName" bottom left>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, i) in items"
              :key="i"
              @click="menuClick(index, i)">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Progress from '@/components/Progress'
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
      ],
      songListfocus: null,
      songListTimer: null
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
    mouseover(index){
      if (this.songListTimer){
        clearTimeout(this.songListTimer);
      }
      this.songListTimer = setTimeout(() => {
        this.songListfocus = index
        this.songListTimer = null
      }, 10)
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
    padding-left: 10px;
    padding-right: 10px;
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
        img{
          height: 40px;
          width: 40px;
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
          }
          .secondary-info{
            display: flex;
            color: #b3b3b3;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
