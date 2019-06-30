<template>
    <div>
        <el-table
        :data="userList"
        style="width: 100%">
        <el-table-column
            prop="username"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="180">
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="电话">
        </el-table-column>
        <el-table-column
            prop="mg_state"
            label="用户状态">
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="操作">
        </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios"
export default {
     data() {
        return {
          userList: []
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList(){
            let res = await axios.get("http://localhost:8888/api/private/v1/users",{
                params:{
                    pagenum:1,
                    pagesize:3
                },
                headers:{
                    Authorization:localStorage.getItem("myToken")
                }
            })
            // create_time: 1486720211
            // email: "adsfad@qq.com"
            // id: 500
            // mg_state: true
            // mobile: "12345678"
            // role_name: "超级管理员"
            // username: "admin"
            console.log(res.data)
            let {meta,data} = res.data
            if(meta.status == 200){
                this.userList = data.users
            }
        }
    }
}
</script>

<style>

</style>
