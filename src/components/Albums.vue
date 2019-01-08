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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
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
        this.topListDetailData.songlist.forEach((item) => {
          songs.push(createSong(item.data))
        })
        this.setLoadingState(false)
        return songs
      }
    }
  },
  mounted(){
    this.getTopListDetailData(26)
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
  }

</style>
