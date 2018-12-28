import api from '../../fetch/api'
import * as types from '../types'

const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户登录信息
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // 用户数据信息
    userData: [],
    //用户菜单信息
    menuData: []
}

const actions = {
    /**
     * 用户登录
     */
    setUserInfo({ commit }, res) {
        localStorage.setItem('userInfo', JSON.stringify(res))
        localStorage.setItem('loginStatus', true)
        commit(types.SET_USER_INFO, res)
        commit(types.SET_LOGIN_STATUS, true)
    },

    /**
     * 退出登录
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('routers')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.SET_USER_INFO, {})
        commit(types.SET_USER_MENU, [])
        commit('SET_ROUTERS', [])
        commit('DEL_ALL_VIEWS')//删除操作历史,在vuex tagsView模块中
    },

    /**
     * 请求用户信息
     */
    getUserData({ commit }, id) {
        commit(types.COM_LOADING_STATUS, true)
        api.UserInfo(id)
            .then(res => {
                commit(types.COM_LOADING_STATUS, false)
                commit(types.GET_USER_DATA, res.data)
            })
    },

    /**
     * 获取用户对应菜单信息
     */
    getMenusByUser({ commit }) {
        return new Promise((resolve, reject) => {
            api.MenuInfo(state.userInfo.user_name)
                .then(res => {
                    if (res.help && res.code == "1") {
                        commit(types.GET_MENUS_BY_USER, res.help)
                        resolve(res)
                    } else {
                        reject(res)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

const getters = {
    getUserData: state => state.userData,
    loginStatus: state => state.loginStatus,
    userInfo: state => state.userInfo,
    menuData: state => state.menuData
}

const mutations = {
    [types.SET_USER_INFO](state, res) {
        state.userInfo = res
    },

    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    },

    [types.GET_USER_DATA](state, res) {
        state.userData = res
    },

    [types.SET_USER_MENU](state, res) {
        state.menuData = res
    },

    [types.GET_MENUS_BY_USER](state, res) {
        state.menuData = res
        localStorage.setItem('routers', JSON.stringify(res));
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}