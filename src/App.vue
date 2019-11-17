<template>
  <div id="app">
    <router-view />
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
    async init(){
      const { data: { items: [item] }} = await getVKey()
      this.setVKey(item.vkey)
    },
    ...mapActions([
      'setVKey'
    ])
  }
};
</script>
