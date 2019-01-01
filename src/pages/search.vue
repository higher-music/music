<!--
 @Author: ganp
 @Date: 2018/12/28 19:27
 @ProjectName: high-material-music
 @title: search
-->

<template>
  <div class="main-container">
    <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keyup.enter="searchMusic"/>
    <SongList ref="searchRef"/>
  </div>
</template>

<script>
import SongList from '@/components/SongList'
export default {
  components: { SongList },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    searchMusic(){
      this.$refs.searchRef.getData(this.text)
    }
  }
}
</script>
