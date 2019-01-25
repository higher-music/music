import Vue from 'vue';
import Vuex from 'vuex';

import playList from './modules/playList'
import savedList from './modules/savedList'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playList,
    savedList
  }
})
