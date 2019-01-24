<template>
  <v-app dark>
    <AlbumsPicList :data="playLists" type="album" style="margin-top: 20px"/>
  </v-app>
</template>
<script>
import AlbumsPicList from '@/components/AlbumsPicList'
import { getPlayList } from '@/api/rank'
import { createPlayList } from '@/components/js/album'

export default {
  name: 'PlayLists',
  components: { AlbumsPicList },
  data() {
    return {
      playLists: []
    }
  },
  created() {
    this.$loading.show()
    getPlayList().then((res) => {
      res.playlist.data.v_playlist.forEach(t => {
        this.playLists.push(createPlayList(t))
        this.$loading.hide()
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  .header {
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 20px;
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
  }
</style>
