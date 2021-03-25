<template>
  <div class='add'>
      <el-card>
          <el-form label-width="180px" :model="cateInfo" :rules="cateRules" ref="addForm">
            <el-form-item label="上级分类" prop="pid">
              <el-select v-model="cateInfo.pid">
                <el-option label="请选择" value=""></el-option>
                <el-option label="顶级菜单" :value="0"></el-option>
                <el-option v-for="item in toCateList" :key="item.id" :value="item.id" :label="item.catename"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类名称" prop="catename">
              <el-input v-model="cateInfo.catename" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item label="分类图片">
              <el-upload 
              action="#" 
              list-type="picture-card" 
              :on-preview="handlePictureCardPreview" 
              :on-remove="handleRemove" 
              :auto-upload="false" 
              :on-change="fileChange" 
              :limit="1" 
              :on-exceed="limitTips" 
              :file-list='imgUrl'> 
                <i class="el-icon-plus"></i>
               </el-upload>
               <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="cateInfo.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">立即添加</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import {getCategoryList} from "../../request/category"
export default {
  name: 'add',
  data(){
    return {
      imgUrl:[],
      // 一级列表
      toCateList:[],
      cateInfo:{
        pid:'',
        catename:"",
        img:"",
        status:1
      },
      cateRules:{
        pid:{required:true,message:'请选择',trigger:'blur'},
        catename:{required:true,message:'请输入分类名称',trigger:'blur'}
      },
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  created(){
    this.getList();
  },
  methods: {
    submitForm(){
      this.$refs.addForm.validate(async valid=>{
        if(valid){
          const fd=new FormData();
          for(let key in this.cateInfo){
            fd.append(key,this.cateInfo[key]);
          }
          const res=await this.$http.post('/api/cateadd',fd);
          if(res.code==200){
            this.$success('添加成功');
            this.$router.push("/category");
          }else{
            this.$error('添加失败')
          }
        }else{
          console.log("校验失败")
        }
      })
    },
    resetForm(){
      this.$refs.addForm.resetFields();
      this.imgUrl=[]
    },
    async getList(){
      const list =await getCategoryList();
      if(list){
        this.toCateList=list;
      }
    },
    handleRemove(file) { 
      console.log(file)
    },
    handlePictureCardPreview(file) { 
      this.dialogImageUrl = file.url; 
      this.dialogVisible = true; 
    },
    fileChange(file){
      this.cateInfo.img=file.raw;
    },
    limitTips(){
      this.$error('此处只能上传一张图片')
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
