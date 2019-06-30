import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import User from '@/components/user/User'

Vue.use(Router)
// 配置路由规则
const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children:[
        {
          path: 'user',
          component: User
        }
      ]
    }
  ]
})
// 只要是路由，全局导航守卫，拦截路由
router.beforeEach((to, from, next) => {
  // 判断是否登录过
  if(to.path == "/login"){
    next()
  }else{
    const token = localStorage.getItem("myToken")
    if(token){
      next()
    }else{
      next("/login")
    }
  }
})
export default router

