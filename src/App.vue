<template>
  <div id="app">
    <v-app dark>
      <navSide ref="nav"/>
      <tool-bar @menu-click="toggleNav"/>
      <v-content>
        <router-view/>
      </v-content>
      <v-footer app>
        <v-card tile>
          <v-progress-linear
            :value="50"
            class="my-0"
            height="3"
          ></v-progress-linear>

          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>The Walker</v-list-tile-title>
                <v-list-tile-sub-title>Fitz & The Trantrums</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-spacer></v-spacer>

              <v-list-tile-action>
                <v-btn icon>
                  <v-icon>fast_rewind</v-icon>
                </v-btn>
              </v-list-tile-action>

              <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
                <v-btn icon>
                  <v-icon>pause</v-icon>
                </v-btn>
              </v-list-tile-action>

              <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
                <v-btn icon>
                  <v-icon>fast_forward</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import navSide from '@/components/NavSide'
import ToolBar from '@/components/ToolBar'
export default {
  name: 'App',
  components: { navSide, ToolBar },
  data() {
    return {
      json: '',
      visible: true
    }
  },
  methods: {
    toggleNav() {
      this.$refs.nav.toggle()
    }
  }
};
</script>
