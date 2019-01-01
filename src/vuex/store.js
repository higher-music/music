import Vue from 'vue';
import Vuex from 'vuex';

import search from './modules/search';
import rank from './modules/rank';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    search,
    rank
  }
});
