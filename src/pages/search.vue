<!--
 @Author: ganp
 @Date: 2018/12/28 19:27
 @ProjectName: high-material-music
 @title: search
-->

<template>
  <div>
    <v-text-field v-model="text" label="Search" color="#7b1fa2" clearable @keyup.enter="searchMusic"/>
    <p>{{ result }}</p>
  </div>
</template>

<script>
import { search } from '@/api/search'
export default {
  name: 'Search',
  data() {
    return {
      text: '',
      result: ''
    }
  },
  methods: {
    searchMusic() {
      search(this.text, 1, null, 20).then((res) => {
        this.result = JSON.stringify(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
