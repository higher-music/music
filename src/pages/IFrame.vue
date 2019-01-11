<template>
  <v-app dark>
    <v-layout fixed>
      <Player/>
    </v-layout>
    <v-layout>
      <SongList :data="list" :show-menu="false" show-rank/>
    </v-layout>
  </v-app>
</template>

<script>
import axios from 'axios'
import Player from '@/components/Player'
import SongList from '@/components/SongList'
import { createSong } from '@/components/js/song'
import { mapActions } from 'vuex'
export default {
  name: 'Iframe',
  components: {
    SongList,
    Player
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    axios.get(`http://musicapi.tx114.5644.pw/api/getMusicList.php?id=${this.$route.params.id}`).then((res) => {
      res.data.data.forEach((item) => {
        this.list.push(createSong(item))
        this.playAll()
      })
    })
  },
  methods: {
    ...mapActions([
      'replacePlayList'
    ]),
    playAll() {
      this.replacePlayList(this.list)
    }
  }
}
</script>

<style scoped>

</style>
