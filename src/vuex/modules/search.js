import search from '@/api/search'

const state = {
  searchData: {}
}

const actions = {

  getSearchData({ commit }, str){
    search(str, 1, 20).then((res) => {
      commit('GET_SEARCH_DATA', res)
    })
  }
}

const getters = {
  searchData: state => state.searchData
}

const mutations = {
  GET_SEARCH_DATA(state, res) {
    state.searchData = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
