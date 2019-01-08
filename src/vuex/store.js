import Vue from 'vue';
import Vuex from 'vuex';

import playList from './modules/playList'
import com from './modules/com';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playList,
    com
  }
});
