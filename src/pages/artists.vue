<template>
  <main class="main-container">
    <PicList :data="hotArtistsList" type="singer"/>
  </main>
</template>
<script>
import PicList from '@/components/PicList'
import { getSingerList } from '@/api/singer'
import { createSinger } from '@/components/js/album'

export default {
  name: 'Artists',
  components: { PicList },
  data() {
    return {
      hotArtistsList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(){
      const { data } = await getSingerList()
      data.list.forEach(t => {
        this.hotArtistsList.push(createSinger(t))
      })
    }
  }
}
</script>
