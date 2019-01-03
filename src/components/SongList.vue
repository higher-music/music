<template>
  <div class="song-list-container">
    <div v-show="loading">
      <Progress/>
    </div>
    <div v-for="(item,index) in data" :key="index" class="song-list-wapper" @mouseover="mouseover(index)">
      <div class="song-list">
        <div v-if="showRank" class="rank">{{ index+1 }}</div>
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
        <v-menu v-show="index ===songListfocus " bottom left>
          <v-btn slot="activator" dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, i) in items"
              :key="i">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Progress from '@/components/Progress'
export default {
  name: 'SongList',
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
    innerData: {
      type: Boolean,
      default: false
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
  methods: {
    ...mapActions([
      'addSongToCurrentIndex'
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
      }, 30)
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
    .song-list-wapper:hover{
      background-color: rgba(255,255,255,.04);
    }
  }
</style>
