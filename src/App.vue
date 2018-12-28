<template>
  <div id="app">
    <v-app dark>
      <!--<v-navigation-drawer app></v-navigation-drawer>-->
      <navSide/>
      <!--<v-toolbar app/>-->
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
      <v-footer app/>
    </v-app>
    <!--<router-view/>-->
  </div>
</template>

<script>
import navSide from '@/components/navSide'
import { getTopList } from '@/api/rank'
export default {
  name: 'App',
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
};
</script>
