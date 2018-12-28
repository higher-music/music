<!--
 @Author: ganp
 @Date: 2018/12/28 16:05
 @ProjectName: high-material-music
 @title: home
-->

<template>
  <div>
    <h1>HelloWorld</h1>
    <p>{{ json }}</p>
  </div>
</template>

<script>
import { getTopList } from '../api/rank'
export default {
  name: 'Home',
  data() {
    return {
      json: ''
    }
  },
  created() {
    getTopList().then((res) => {
      this.json = JSON.stringify(res)
    })
  }
}
</script>

<style scoped>

</style>
