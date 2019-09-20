<template>
  <div class="all">
    <div class="head">
      <v-btn :ripple="false" icon dark @click="$emit('close-click')">
        <v-icon>close</v-icon>
      </v-btn>
      <v-spacer/>
      <v-btn :ripple="false" dark flat small @click="clearAllSong">
        ClearAll
      </v-btn>
    </div>
    <div v-if="playList.length > 0" class="content">
      <div v-for="(item,index) in playList" :key="index" :class="{activeSongBG:index === currentIndex}" class="song-list">
        <div v-if="index !== currentIndex" class="rank">{{ index + 1 }}</div>
        <div v-else class="rank"><v-icon>play_circle_outline</v-icon></div>
        <img
          v-lazy="item.image"
          :alt="item.name"
          :title="item.name"
          class="image"
          @click="playIndex(index)" >
        <div class="track-info" @click="playIndex(index)">
          <div class="song-name-container">
            <span :class="{activeSong:index === currentIndex}">{{ item.name }}</span>
          </div>
          <div class="secondary-info">
            <span v-for="(one, i) in item.singer" :key="i" @click.stop="toSinger(one)">
              {{ one.name }}
              <span v-if="i !== item.singer.length - 1">•&nbsp;</span>
            </span>
          </div>
        </div>
        <v-btn slot="activator" :ripple="false" :class="menuClassName" dark icon @click="deleteSong(index)">
          <v-icon>delete</v-icon>
        </v-btn>
      </div>
    </div>
    <div v-else class="card">
      <span>Empty</span>
    </div>
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
    },
    toSinger(item) {
      this.$router.push('/singer/' + item.mid)
      this.$emit('close-click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .all{
    display:flex;
    flex-direction: column;
    height: 100vh;
    background: linear-gradient(to top, #414345, #232526) !important;
    .head {
      background: #212121;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .content {
      padding: 0 10px;
      flex: 1;
      overflow-y: scroll;
      .song-list{
        height: 60px;
        cursor: pointer;
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
          width: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
        }
        img{
          width: 40px;
          height: 40px;
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
      .activeSongBG{
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
    .card{
      flex: 1;
      width: 100%;
      font-size: 50px;
      display: flex;
      display: -webkit-flex;
      display: -moz-flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
