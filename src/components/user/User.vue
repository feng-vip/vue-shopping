<template>
    <div>
        <el-breadcrumb separator="/" class="user-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/home/user' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row :gutter="20">
            <el-col :span="6">
                  <el-input placeholder="请输入内容" v-model="queryStr" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                 <el-button type="success" plain @click="showAddUserDialog">添加用户</el-button>
            </el-col>
        </el-row>
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
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="changUserState(scope.row.id,scope.row.mg_state)"> 
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="mobile" label="操作">
                <!-- 自定义表格列 -->
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain icon="el-icon-edit" circle></el-button>
                    <el-button type="primary" size="mini" plain icon="el-icon-delete" circle @click="delUserMsg(scope.row.id)"></el-button>
                    <el-button type="success" size="mini" plain icon="el-icon-check" >分配角色</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 给当前页。sync修饰符同步数据 -->
        <el-pagination
            background
            :page-size="pageSize"
            :current-page.sync="curPage"
            @current-change="changePage"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addUserSwitch" @close="resetUserForm">
            <el-form :model="addUserForm" label-width="120px" :rules="rules" ref="addUserForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addUserSwitch = false">取 消</el-button>
                <el-button type="primary" @click="valideAddUserRule">确 定</el-button>
            </div>
            </el-dialog>
    </div>
</template>

<script>
export default {
     data() {
        return {
          userList: [],
          curPage:1,
          pageSize:2,
          total:0,
          queryStr:"",
        //  显示和隐藏添加用户的开关
          addUserSwitch:false,
          addUserForm:{
              username:"",
              password:"",
              email:"",
              mobile:""
          },
          rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
            }
        }
    },
    created(){
        this.getUserList(this.curPage)
    },
    methods:{
        async getUserList(curPage=1){
            let res = await this.$http.get("/users",{
                params:{
                    pagenum:curPage,
                    pagesize:this.pageSize,
                    query:this.queryStr || ""
                }
            })
            let {meta,data} = res
            if(meta.status == 200){
                this.userList = data.users
                this.total=data.total
            }
        },
        // 改变当前页
        changePage(curPage){
            this.getUserList(curPage)
        },
        // 查询用户
        queryUser(){
            this.curPage=1
            this.getUserList()
        },
        // 改变用户的状态
        async changUserState(id,curState){
           let res = await this.$http.put(`/users/${id}/state/${curState}`)
           let {meta,data} = res
           if(meta.status === 200){
               this.$message({
                   type:"success",
                   message:data.mg_state === 0? "禁用成功":"启用成功",
                   duration:1000
               })
           }
        },
        // 显示添加用户的对话框
        showAddUserDialog(){
            this.addUserSwitch=true
        },

        // 重置添加用户表单
        resetUserForm(){
            this.$refs.addUserForm.resetFields();
        },

        // 删除用户
        delUserMsg(id){
            this.$confirm('您确认要删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.delete(`/users/${id}`).then(res=>{
                        let{meta} = res
                        console.log(res)
                        if(meta.status == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!',
                                duration:1000
                            });
                        }
                        this.getUserList();
                        this.curPage = 1
                    })
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
            
        },
        // 验证添加用户的规则
        valideAddUserRule(){
            this.$refs.addUserForm.validate(valid=>{
                if(valid){
                    this.$http.post("/users",this.addUserForm).then(res=>{
                        let {meta} = res
                        if(meta.status === 201){
                            // 1.关闭对话框，并重置表单
                            this.addUserSwitch=false;
                            this.$message({
                                type:"success",
                                message:"添加用户成功",
                                duration:1000
                            })
                            // 2.刷新用户列表
                            this.getUserList()
                            this.curPage = 1
                        }
                    })
                }else{
                    console.log("error")
                }
            })
        }
    }
}
</script>

<style>
.user-breadcrumb{
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    background-color:rgb(216, 243, 242);
    padding-left:10px;
}
</style>
