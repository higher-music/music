const state = {
    isShow: false,
    formType: 'add',
    formData: {},
    getListDataFlag: false
}

const actions = {
    //弹层表单显示或隐藏
    formShowStatus({ commit }, status) {
        commit("FormShowStatus", status)
    },
    //弹层表单类型（添加或编辑）
    formTypeStatus({ commit }, status) {
        commit("FormTypeStatus", status)
    },
    //弹层表单内容
    getFormData({ commit }, status) {
        commit("FormGetFormData", status)
    },
    //列表数据获取标记
    formGetListDataFlag({ commit }, status) {
        commit("FormGetListDataFlag", status)
    }
}

const getters = {
}

const mutations = {
    FormShowStatus(state, status) {
        state.isShow = status
    },
    FormTypeStatus(state, status) {
        state.formType = status
    },
    FormGetFormData(state, status) {
        state.formData = status
    },
    FormGetListDataFlag(state, status) {
        state.getListDataFlag = status
    },
}

export default {
    state,
    actions,
    getters,
    mutations
}