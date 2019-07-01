# vue-shopping的项目

# 安装element-ui
    npm i element-ui -S  

# 接口文档在线
    https://shop-api.circle.ink/

# 编程式导航 ：就是通过js代码实现的路由跳转
    router：路由跳转  route:接受参数
    this.$router.push("/home")

# 只要是路由，全局导航守卫，拦截路由
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

# 安装 less
    npm i -D less less-loader

# 配置axios，公共路径，拦截器

# 1.将axios添加到Vue的对象原型中
    Vue.prototype.$http=axios

# 2.配置公共路径
    axios.defaults.baseURL="http://localhost:8888/api/private/v1"

# 3.添加请求拦截器
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

# 添加响应拦截器
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
