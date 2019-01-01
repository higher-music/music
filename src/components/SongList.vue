<template>
  <div class="song-list-container">

    <div v-for="(item,index) in songList" class="song-list-wapper">
      <div class="song-list">
        <div class="rank">{{ index+1 }}</div>
        <img :src="songListPic(item.albummid)" alt="">
        <div class="track-info">
          <div class="song-name-container">
            <span>{{ item.songname }}</span>
          </div>
          <div class="secondary-info">
            <template v-for="(s,i) in item.singer">
              <span v-if="i !== item.singer.length-1" >{{ s.name }} & &nbsp;</span>
              <span v-if="i === item.singer.length-1" >{{ s.name }}</span>
            </template>
          </div>
        </div>

        <v-menu bottom left>
          <v-btn
            slot="activator"
            dark
            icon
          >
            <v-icon>more_vert</v-icon>
          </v-btn>

          <v-list>
            <v-list-tile
              v-for="(item, i) in items"
              :key="i"
              @click=""
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SongList',
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
      'searchData'
    ]),
    songList(){
      if (this.searchData && this.searchData.code === 0 && this.searchData.data && this.searchData.data.song && this.searchData.data.song.list){
        console.log(this.searchData)
        return this.searchData.data.song.list
      }
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    songListPic(albumId){
      return `http://y.gtimg.cn/music/photo_new/T002R90x90M000${albumId}.jpg?max_age=2592000`
    },
    ...mapActions([
      'getSearchData'
    ]),
    getData(){
      this.getSearchData()
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
