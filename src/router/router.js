import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import Page from '@/views/Page.vue'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/page1',
  },

  // 登录注册
  {
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        components: {
          login: () => import('@/views/user/Login.vue'),
        },
        meta: { title: '登录' },
      },
      {
        path: 'register',
        name: 'Register',
        components: {
          register: () => import('@/views/user/Register.vue'),
        },
        meta: { title: '注册' },
      },
    ],
  },

  // 404 路由缺失页面
  {
    path: '/not-found',
    component: () => import('@/views/error-pages/NotFound.vue'),
    meta: { title: '404 NotFound' },
  },
]

export const asyncRoutes = [
  {
    path: '',
    component: MainLayout,
    single: true,
    children: [
      {
        path: 'page1',
        name: 'Page1',
        component: Page,
        meta: { title: 'page-1', icon: 'file-text' },
      },
    ],
  },

  {
    path: '',
    meta: { title: 'Pages', icon: 'folder', openKey: 'pages' },
    component: MainLayout,
    children: [
      {
        path: 'page2',
        name: 'Page2',
        component: Page,
        meta: { title: 'page-2', openKey: 'pages' },
      },
      {
        path: 'page3',
        name: 'Page3',
        component: Page,
        meta: { title: 'page-3', openKey: 'pages' },
      },
    ],
  },

  { path: '*', redirect: '/not-found', hidden: true },
]

const createRouter = () => new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE || 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes,
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
