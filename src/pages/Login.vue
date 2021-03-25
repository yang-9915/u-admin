<template>
  <div class="login">
    <div class="login-box">
      <h3 class="title">小u商城后台管理系统</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item  prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名">
              <template slot="prepend">
                  <i class="el-icon-user"></i>
              </template>
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input type="password" v-model="ruleForm.password" show-password autocomplete="off" placeholder="请输入密码">
              <template slot="prepend">
                    <i class="el-icon-lock"></i>
               </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return{
          ruleForm:{
              username:"",
              password:""
          },
          rules:{
              username:[{required:true,message:"请输入用户名",trigger:"blur"}],
              password:[{required:true,message:"请输入密码",trigger:"blur"}]
          }
      }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/api/userlogin",this.ruleForm).then(res=>{
           if(res.code==200){
              
               this.$success("登录成功")
               sessionStorage.setItem('userinfo',JSON.stringify(res.list))
                this.$router.push('/')
           }else{
              this.$error("登录失败")
           }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.login {
  height: 100vh;
  min-width: 970px;
  background: url("../assets/img/loginbg.jpeg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  background: #fff;
  width: 400px;
  height: 300px;
  border-radius: 5px;
  padding: 30px;
}
.title {
  text-align: center;
  margin-bottom: 30px;
  color: #409eff;
}
.btn-login {
  width: 100%;
}
</style>
