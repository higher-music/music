import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import form from './modules/form';
import tagsView from './modules/tagsView';
import com from './modules/com';
import permission from './modules/permission';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    permission,
    form,
    tagsView,
    com
  }
});
