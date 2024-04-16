import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/main',
    children: [
      {
        path: 'main',
        name: 'Main',
        component: () => import('@/views/main/index'),
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true, noCache: false }
      }]
  },
  {
    path: '/main',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'reset',
        name: 'Reset',
        component: () => import('@/views/main/reset'),
        meta: { title: '用户信息', icon: 'el-icon-s-home' }
      }]

  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
