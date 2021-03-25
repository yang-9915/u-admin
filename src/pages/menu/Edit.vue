<template>
  <div class="edit">
    <el-card>
        <el-form ref="addForm" :model="formData" :rules="formRules" label-width="120px">
        <el-form-item label="类型" prop="type">
            <el-radio-group v-model="formData.type">
                <el-radio :label="1">目录</el-radio>
                <el-radio :label="2">菜单</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="上级" prop="pid" v-if="formData.type==2">
            <el-select v-model="formData.pid" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="title">
            <el-input v-model="formData.title" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="图标" v-if="formData.type==1" prop="icon">
            <el-input v-model="formData.icon" placeholder="请输入菜单图标"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url" v-if="formData.type==2">
            <el-input v-model="formData.url" placeholder="请输入菜单地址"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click="submitForm">立即修改</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { getMenuById, getMenuList } from '../../request/menu';
export default {
  name: "edit",
  data() {
    return {
      menuList:[],
      formData: {
        id:this.$route.params.id,
        pid:'',
        type:1,
        title:'',
        icon:"",
        url:'',
        status:1
      },
      formRules:{
          type:{required:true,message:'请选择类型',trigger:'blur'},
          title:{required:true,message:'请输入菜单名称',trigger:'blur'},
          status:{required:true,message:'请选择状态',trigger:'blur'}
      }
    };
  },
  methods: {
    submitForm() {
    console.log(this.$refs)
      this.$refs.addForm.validate(async valid=>{
          if(valid){
              const res=await this.$http.post('/api/menuedit',{...this.formData,id:this.$route.params.id});
              if(res.code==200){
                  this.$success('修改成功');
                  this.$router.push("/menu");
              }else{
                  this.$error('修改失败');
              }
          }else{
              return this.$error('表单校验失败')
          }
      })
    },
    resetForm(){
        this.$refs.addForm.resetFields();
    }
  },
  created() {
      getMenuList().then(res=>{
          this.menuList=res;
      });
      getMenuById(this.formData.id).then(res=>{
          this.formData=res
      })
  },
};
</script>
<style scoped>
.edit{
    width: 600px;
    margin: 0 auto;
}
</style>
