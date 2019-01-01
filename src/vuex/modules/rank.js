import { getTopList, getMusicList } from '@/api/rank'

const state = {
  // 获取Top榜单
  topListData: {},
  // 根据top榜单id获取榜单中音乐列表
  topListDetailData: {}
}

const actions = {
  getTopListData({ commit }){
    getTopList().then((res) => {
      console.log(res,11111)
      commit('GET_TOP_LIST_DATA', res)
    })
  },
  getTopListDetailData({ commit }, topid){
    getMusicList(topid).then((res) => {
      console.log(res,222222)
      commit('GET_TOP_LIST_DETAIL_DATA', res)
    })
  }
}

const getters = {
  topListData: state => state.topListData,
  topListDetailData: state => state.topListDetailData
}

const mutations = {
  GET_TOP_LIST_DATA(state, res) {
    state.topListData = res
  },
  GET_TOP_LIST_DETAIL_DATA(state, res) {
    state.topListDetailData = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
