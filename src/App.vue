<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getVKey } from '@/api/song'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created() {
    this.init()
  },
  methods: {
    // 初始化vkey
    async init() {
      const { data: { items: [item] }} = await getVKey()
      const { vkey } = item
      this.setVKey(vkey)
    },
    ...mapActions([
      'setVKey'
    ])
  }
};
</script>
