import Vue from 'vue'
import tnSvg from '@/components/tnSvg'// svg组件
// register globally
Vue.component('tnSvg', tnSvg)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', true, /\.svg$/)
const iconMap = requireAll(req)
