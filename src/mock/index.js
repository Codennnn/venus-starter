import Mock from 'mockjs'

import user from './user'

Mock.mock('/user/login', 'post', user.login)
Mock.mock('/user/logout', 'post', { code: 2000 })
Mock.mock('/user/info', 'get', user.info)

Mock.setup({
  timeout: '300-500',
})
