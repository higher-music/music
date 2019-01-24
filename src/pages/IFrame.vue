<template>
  <v-app dark>
    <v-content app>
      <SongList :data="list" :show-menu="false" show-rank/>
    </v-content>
    <v-footer height="100" app fixed>
      <Player :autoplay="autoplay"/>
    </v-footer>
  </v-app>
</template>

<script>
import Player from '@/components/Player'
import SongList from '@/components/SongList'
import { createSong } from '@/components/js/song'
import { mapActions } from 'vuex'
import { jsonp2 } from '@/api/jsonp'

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
  computed: {
    autoplay() {
      return this.$route.params.autoplay === 'true';
    }
  },
  created() {
    jsonp2(`http://musicapi.tx114.5644.pw/api/qq_music/getMusicList.php?id=${this.$route.params.id}`, { name: 'callback' }).then((res) => {
      res.data[0].songlist.forEach((item) => {
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
