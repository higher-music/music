<template>
  <div class="albums-container">
    <header>
      <div class="header-image-container">
        <img class="header-image" src="" alt="">
      </div>
      <div class="header">
        <div class="artwork" style=""/>
      </div>
    </header>
    <section>
      <div class="tracklist">
        <SongList :data="songList"/>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { createSong } from '@/components/js/song';
import SongList from '@/components/SongList'
export default {
  components: { SongList },
  computed: {
    ...mapGetters([
      'topListData',
      'topListDetailData',
      'loading'
    ]),
    albumsPicList() {
      if (this.topListData && this.topListData.code === 0 && this.topListData.data && this.topListData.data.topList){
        return this.topListData.data.topList
      }
    },
    songList(){
      if (this.topListDetailData && this.topListDetailData.code === 0 && this.topListDetailData.songlist){
        const songs = []
        const songList = (this.topListDetailData.songlist).slice(0, 100)
        songList.forEach((item) => {
          songs.push(createSong(item.data))
        })
        this.setLoadingState(false)
        return songs
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(v) {
        this.getTopListDetailData(v.params.id)
      }
    }
  },
  methods: {
    ...mapActions([
      'getTopListDetailData',
      'setLoadingState'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .albums-container{
    background-color: #000;
    height: 100%;
    overflow-x: hidden;
    -webkit-perspective: 1px;
    perspective: 1px;
    -webkit-perspective-origin: center top;
    perspective-origin: center top;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-animation: .7s fadein;
    animation: .7s fadein;
    header{
      min-height: 190px;
      max-height: 300px;
      height: 50%;
      position: relative;
      vertical-align: top;
      -webkit-transform-origin: center top;
      transform-origin: center top;
      -webkit-transform: translateZ(-.6px) scale(1.6);
      transform: translateZ(-.6px) scale(1.6);
      .header-image-container{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        background-color: #000;
        .header-image{
          width: 100%;
          height: 100%;
          -o-object-position: center 30%;
          object-position: center 30%;
          -o-object-fit: cover;
          object-fit: cover;
          opacity: .45;
        }
      }
      .header{
        position: absolute;
        height: 100%;
        display: flex;
        align-items: flex-end;
        .artwork{
          background-size: cover;
          min-width: 170px;
          height: 170px;
          margin: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,.5);
          border-radius: 4px;
        }
      }
    }
    section{
      box-shadow: 0 0 20px 0 #000;
      background-image: linear-gradient(#04060c,#1e3264 120%);
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      min-height: calc(100% - 300px);
      .tracklist{
        padding: 10px;
      }
    }
  }

</style>
