<template>
  <div class='add'>
      <el-card>
          <el-form label-width="180px" :model="formData" :rules="formRules" ref="addForm">
          <el-form-item label="角色名称" prop="roleid">
            <el-select placeholder="请选择" v-model="formData.roleid">
              <el-option  label="请选择" :value="0"></el-option> 
              <el-option v-for="item in roleList" :key="item.id"  :label="item.rolename" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理员名称" prop="username">
            <el-input placeholder="请输入管理员名称" v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="管理员密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm">立即添加</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
import {getRoleList} from "../../request/role"
export default {
  name: 'add',
  data(){
    return {
      roleList:[],
      formData:{
        roleid:"",
        username:"",
        password:"",
        status:1
      },
      formRules:{
        roleid:{required:true,message:'请输入角色名称',trigger:"blur"},
        username:{required:true,message:'请输入管理员名称',trigger:"blur"}
      }
    }
  },
  created(){
    this.getRoleList()
  },
  methods: {
    submitForm(){
      this.$refs.addForm.validate(async valid=>{
        if(valid){
          const res=await this.$http.post("/api/useradd",this.formData)
          if(res){
            this.$success('添加成功')
            this.$refs.addForm.resetFields();
            this.$router.push("/admin");
          }else{
            this.$error('添加失败')
          }
        }
      })
    },
    resetForm(){
      this.$refs.addForm.resetFields()
    },
    async getRoleList(){
      const res=await getRoleList();
      if(res){
        this.roleList=res;
      }
    }
  }
}
</script>
<style scoped>
.el-form{
  width: 600px;
  margin: auto;
}
</style>
