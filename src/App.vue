<template>
  <div id="app">
    <v-app dark>
      <navSide ref="nav"/>
      <tool-bar @menu-click="toggleNav"/>
      <v-content>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
      </v-content>
      <v-footer height="64" app>
        <player/>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import NavSide from '@/components/NavSide'
import ToolBar from '@/components/ToolBar'
import Player from '@/components/Player'
import { getVKey } from '@/api/song'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: { NavSide, ToolBar, Player },
  data() {
    return {
      json: '',
      visible: true
    }
  },
  created() {
    getVKey().then((res) => {
      if (res.code === 0) {
        this.setVKey(res.data.items[0].vkey)
      } else {
        console.log('VKey初始化失败，可能无法正常播放歌曲')
      }
    })
  },
  methods: {
    ...mapActions([
      'setVKey'
    ]),
    toggleNav() {
      this.$refs.nav.toggle()
    }
  }
};
</script>
