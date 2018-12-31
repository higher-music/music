<template>
  <div class="song-list-container">
    <div v-for="(item,index) in list" class="song-list-wapper">
      <div class="song-list">
        <div class="rank">{{ index+1 }}</div>
        <img :src="songListPic(item.albummid)" alt="">
        <div class="track-info">
          <div class="song-name-container">
            <span>{{ item.songname }}</span>
          </div>
          <div class="secondary-info">
            <template v-for="(s,i) in item.singer">
              <span v-if="i !== item.s.length-1" >{{ s.name }} & &nbsp;</span>
              <span v-if="i === item.s.length-1" >{{ s.name }}</span>
            </template>
          </div>
        </div>
        <v-btn
          slot="activator"
          dark
          icon
        >
          <v-icon>more_vert</v-icon>
        </v-btn>

      </div>
    </div>
  </div>
</template>

<script>
import { search } from '../api/search'
export default {
  name: 'SongList',
  data(){
    return {
      list: []
    }
  },
  computed: {

  },
  mounted(){
    this.searchMusic()
  },
  methods: {
    searchMusic() {
      search('cy', 1, 20).then((res) => {
        this.list = res.data.song.list
        console.log(res)
        console.log(this.list)
      })
    },
    songListPic(albumId){
      return `http://y.gtimg.cn/music/photo_new/T002R90x90M000${albumId}.jpg?max_age=2592000`
    }
  }
}
</script>

<style lang="scss" scoped>
  .song-list-container{
    padding-left: 20px;
    padding-right: 20px;
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
  }
</style>
