import Vue from 'vue'

import PerfectScrollbar from 'vue2-perfect-scrollbar'
import VueFeather from 'vue-feather'
import Storage from './storage'
import OnlineCheck from './online-check'
import './ant-design'
import 'dayjs/locale/zh-cn'
import '@/mock'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import '@/assets/scss/tailwind.scss'

Vue.use(PerfectScrollbar)
Vue.use(VueFeather)
Vue.use(Storage)
Vue.use(OnlineCheck)
