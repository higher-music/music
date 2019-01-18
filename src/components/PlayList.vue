<template>
  <div v-if="playList.length > 0" :key="0" class="song-list-container">
    <div class="head">
      <v-btn icon dark @click="$emit('close-click')">
        <v-icon>close</v-icon>
      </v-btn>
      <v-spacer/>
      <v-btn dark flat small @click="clearAllSong">
        ClearAll
      </v-btn>
    </div>
    <hr>
    <div v-for="(item,index) in playList" :key="index" :class="{activeSongBG:index === currentIndex}" class="song-list-wapper">
      <div class="song-list">
        <div v-if="index !== currentIndex" class="rank">{{ index + 1 }}</div>
        <div v-else class="rank"><v-icon>play_circle_outline</v-icon></div>
        <img
          :src="item.image"
          :alt="item.name"
          :title="item.name"
          @click="playIndex(index)">
        <div class="track-info" @click="playIndex(index)">
          <div class="song-name-container">
            <span :class="{activeSong:index === currentIndex}">{{ item.name }}</span>
          </div>
          <div class="secondary-info">
            <span>{{ item.singer }}</span>
          </div>
        </div>
        <v-btn slot="activator" :class="menuClassName" dark icon @click="deleteSong(index)">
          <v-icon>delete</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
  <div v-else class="card">
    <span>Empty</span>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PlayList',
  computed: {
    ...mapGetters([
      'playList',
      'currentIndex'
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
      'delSong',
      'clearAllSong'
    ]),
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
  .head {
    background: #212121;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    align-items: center;
  }
  .song-list-container{
    background: #212121;
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
        .activeSong{
          color: rgb(105, 240, 174);
        }
      }
    }
    .activeSongBG{
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
  .card{
    width: 100%;
    height: 100%;
    font-size: 50px;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    justify-content: center;
    align-items: center;
    background: #212121;
  }
</style>
