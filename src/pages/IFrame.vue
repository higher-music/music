<template>
  <v-app dark>
    <v-content app>
      <Progress :show="loading"/>
      <div class="main-iframe scroll-container">
        <SongList :data="list" :show-menu="false" show-rank/>
      </div>
    </v-content>
    <v-footer height="100" app>
      <Player :autoplay="autoplay" :show-list-menu="false"/>
    </v-footer>
  </v-app>
</template>

<script>
import Player from '@/components/Player'
import SongList from '@/components/SongList'
import { createSong } from '@/components/js/song'
import { mapActions } from 'vuex'
import { jsonp2 } from '@/api/jsonp'
import Progress from '@/components/Progress.vue'

export default {
  name: 'Iframe',
  components: {
    SongList,
    Player,
    Progress
  },
  data() {
    return {
      list: [],
      loading: true
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
        this.loading = false
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
