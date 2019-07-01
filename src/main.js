// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/index.css"

Vue.use(ElementUI);

// 1.将axios添加到Vue的对象原型中
Vue.prototype.$http=axios

// 2.配置公共路径
axios.defaults.baseURL="http://localhost:8888/api/private/v1"

// 3.添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 1.出来登录，其他接口都要添加token,
  if(!config.url.endsWith("/login")){
      config.headers.Authorization=localStorage.getItem("myToken")
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 1.如果响应的状态为401,未登录，跳转到登录
  if(response.data.meta.status === 401){
    // 因为不是在组件中，所以只能router对象
      router.push("/login")
      // 2.清除token
      localStorage.removeItem("myToken")
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});




Vue.config.productionTip = false
// axios.defaults.baseURL = ' http://localhost:8888/api/private/v1';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
