<!--
 @Author: ganp
 @Date: 2018/12/28 19:31
 @ProjectName: high-material-music
 @title: playLists
-->
<template>
  <div class="song-list-container">
    <div class="section-title">PlayLists</div>
    <div v-for="(item,index) in playList" :key="index" class="song-list-wapper" @mouseover="mouseover(index)">
      <div class="song-list">
        <div v-if="index !== currentIndex" class="rank">{{ index+1 }}</div>
        <div v-else><v-icon>play_circle_outline</v-icon></div>
        <img
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
        <v-btn v-show="index === songListfocus " slot="activator" dark icon @click="deleteSong(index)">
          <v-icon>delete_outline</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'PlayLists',
  data() {
    return {
      songListfocus: null,
      songListTimer: null
    }
  },
  computed: {
    ...mapGetters([
      'playList',
      'currentIndex'
    ])
  },
  methods: {
    ...mapActions([
      'addSongToCurrentIndex',
      'delSong'
    ]),
    mouseover(index){
      if (this.songListTimer){
        clearTimeout(this.songListTimer);
      }
      this.songListTimer = setTimeout(() => {
        this.songListfocus = index
        this.songListTimer = null
      }, 30)
    },
    playIndex(index) {
      this.addSongToCurrentIndex(this.playList[index])
    },
    deleteSong(index) {
      this.delSong(index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .section-title{
    cursor: default;
    line-height: normal;
    font-size: 24px;
    font-weight: 500;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 5px;
  }
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
