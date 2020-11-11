import Vue from 'vue'
import {
  Avatar, Button, Badge, Breadcrumb,
  ConfigProvider, Checkbox, Dropdown, Divider,
  Form, Input, Icon,
  message, Menu, Modal, notification, Popover,
  Result, Spin,
  Tabs, Tooltip,
} from 'ant-design-vue'

Vue.config.productionTip = false

Vue.use(Avatar)
Vue.use(Button)
Vue.use(Badge)
Vue.use(Breadcrumb)
Vue.use(ConfigProvider)
Vue.use(Checkbox)
Vue.use(Dropdown)
Vue.use(Divider)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Popover)
Vue.use(Result)
Vue.use(Spin)
Vue.use(Tabs)
Vue.use(Tooltip)

Vue.prototype.$message = message
Vue.prototype.$notify = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$confirm = Modal.confirm
