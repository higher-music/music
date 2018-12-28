import fetch from './fetch'

export default {
    /**
     * 用户登录
     */
    Login(params) {
        return fetch('/user/login', 'post', params)
    },

    /**
     * 获取用户菜单
     */
    MenuInfo(params) {
        return fetch('/user/menu', 'get', params)
    },

    /**
     * 获取列表JSON数据
     */
    getListJson() {
        return fetch('/', 'get', { file: "uums_test", cmd: "uums_test2" })
    }


}
