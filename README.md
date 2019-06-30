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