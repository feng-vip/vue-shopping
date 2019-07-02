<template>
    <el-container class="home-wrapper">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
              <el-row>
                <el-col :span="24">
                  <el-menu
                    :router="true"  
                    default-active="1-1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                      </template>
                      <router-link to="home/user">
                        <el-menu-item index="1-1">
                         <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span>用户列表</span>
                        </template>
                       </el-menu-item>
                      </router-link>
                        
                    </el-submenu>
                    <el-submenu index="2">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户权限</span>
                      </template>
                       <el-menu-item index="2-1">
                         <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span>用户列表</span>
                        </template>
                       </el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-col>
              </el-row>
            </el-aside>
            <el-main>
              <!-- 显示子路由页面 -->
               <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped > 
/* lang="less" */
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #333;
    color: #333;
    /* text-align: center; */
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  }
  
 .el-container {
    margin-bottom: 40px;
    height: 100%;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
