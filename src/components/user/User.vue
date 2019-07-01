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
            let res = await this.$http.get("/users",{
                params:{
                    pagenum:1,
                    pagesize:3
                },
                headers:{
                    Authorization:localStorage.getItem("myToken")
                }
            })
            let {meta,data} = res
            if(meta.status == 200){
                this.userList = data.users
            }
        }
    }
}
</script>

<style>

</style>
