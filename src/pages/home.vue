<!--
 @Author: ganp&&cy
 @Date: 2018/12/28 16:05
 @ProjectName: high-material-music
 @title:
-->

<template>
  <v-app dark>
    <!--<v-navigation-drawer app></v-navigation-drawer>-->
    <navSide/>
    <v-toolbar app/>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer app/>
  </v-app>
</template>

<script>
import navSide from '@/components/navSide'
import { getTopList } from '../api/rank'
export default {
  name: 'Home',
  components: { navSide },
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
