const state = {
  menu: false
}

const actions = {
  setMenu({ commit }, data) {
    commit('SET_MENU', data)
  }
}

const getters = {
  menu: state => state.menu
}

const mutations = {
  SET_MENU(state, data) {
    state.menu = data
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
