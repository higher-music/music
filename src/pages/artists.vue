<template>
  <main class="main-container">
    <PicList :data="data" type="singer"/>
  </main>
</template>
<script>
import PicList from '@/components/PicList'
import { getSingerList } from '@/api/singer'
import { createSinger } from '@/api/format/album'

export default {
  name: 'Artists',
  components: { PicList },
  data() {
    return {
      data: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(){
      const { data: { list = [] }} = await getSingerList()
      let j, len;
      for (j = 0, len = list.length; j < len; j++) {
        this.data.push(createSinger(list[j]))
      }
    }
  }
}
</script>
