<template>
  <div class="main-container">
    <form action="javascript:void(0)" @keydown.enter="getSearchList">
      <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable/>
    </form>
    <div v-if="showHotKeys" class="search-hot-keys">
      <span style="font-size: large;font-weight: bolder">HotKeys:</span>
      <v-chip v-for="(item, index) in hotKeys" :key="index" outline text-color="#fff" @click="searchHotKey(item.k)">{{
      item.k }}
      </v-chip>
    </div>
    <div class="search-scroll">
      <Scroll>
        <SongList :data="songList" :loading="loading"/>
      </Scroll>
    </div>

  </div>
</template>

<script>
import SongList from '@/components/SongList'
import { search, getHotKey } from '@/api/search'
import { createSong2 } from '@/components/js/song'
import Progress from '@/components/Progress'

export default {
  components: { SongList, Progress },
  data() {
    return {
      text: '',
      loading: false,
      songList: [],
      hotKeys: [],
      showHotKeys: true
    }
  },
  watch: {
    text() {
      if (!this.text) {
        this.showHotKeys = true
        this.songList = []
      }
    }
  },
  created() {
    getHotKey().then((res) => {
      this.hotKeys = res.data.hotkey
    })
  },
  methods: {
    getSearchList() {
      this.showHotKeys = false
      this.loading = true
      const songs = []
      search(this.text, 1, 50).then((res) => {
        res.data.song.list.forEach((item) => {
          songs.push(createSong2(item))
        })
        this.songList = songs
        this.loading = false
      })
    },
    searchHotKey(hotKey) {
      this.text = hotKey
      this.getSearchList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .main-container {
    padding: 20px 0 0 0;
    form {
      padding: 0 20px;
    }
    .search-hot-keys {
      padding: 0 20px 5px 20px;
    }
    .search-scroll {
      padding: 0 20px;
      overflow: hidden;
      position: absolute;
      width: 100%;
      height: calc(100% - 84px);
    }
  }

</style>
