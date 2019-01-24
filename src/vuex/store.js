import Vue from 'vue';
import Vuex from 'vuex';

import playList from './modules/playList'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playList
  }
})
