<template>
    <el-row type="flex" class="login-wrapper" justify="center" align="middle">
        <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" >
            <el-form label-position="top" class="login-content" :model="loginFrom" :rules="rules" ref="loginFrom" >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginFrom.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginFrom.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">立即创建</el-button>
                    <el-button @click="resetForm('loginFrom')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
    import axios from 'axios'
  export default {
    data() {
      return {
        loginFrom: {
          username: '',
          password: ''
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
      };
    },
    methods: {
    //  登录
        async login(){
            let res=await axios.post("http://localhost:8888/api/private/v1/login",this.loginFrom)
            console.log(res)
            let {meta,data} = res.data
            if(meta.status == 200){
                console.log(meta.msg)
                // 保存token
                localStorage.setItem("myToken",data.token)
                this.$router.push("/home")
            }else{
                this.$message({
                    type:"error",
                    duration:1000,
                    message:meta.msg
                })
            }
        },
        submitForm() {
            //   ref：用在组件中，表示当前组件
            this.$refs.loginFrom.validate((valid) => {
            if (valid) {
                //  1.成功获取参数
                this.login()
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm() {
            this.$refs.loginFrom.resetFields();
        }
    }
  }
</script>
<style>
.login-wrapper{
    height: 100%;
    background-color: rgb(97, 94, 94);
}
.login-content{
    min-width: 240px;
    background-color: #fff;
    padding: 25px 35px;
    border-radius: 10px;
}
</style>

