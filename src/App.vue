<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
require('inobounce')
import { getVKey } from '@/api/song'
import { mapActions } from 'vuex'

export default {
  name: 'App',
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
    ])
  }
};
</script>
