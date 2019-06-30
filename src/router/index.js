import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'

Vue.use(Router)

// 配置路由规则
export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    }
  ]
})
