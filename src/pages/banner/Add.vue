<template>
  <div class='add'>
      <el-card>
          <el-form label-width="180px" :model="formData" :rules="formRules" ref="addForm">
              <el-form-item label="轮播图名称" prop="title">
                  <el-input placeholder="请输入轮播图名称" v-model="formData.title"></el-input>
              </el-form-item>
              <el-form-item label="轮播图图片" prop="img">
                  <el-upload
                    action="#"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                    :limit="1"
                    :on-exceed="limitTips"
                    :on-change="fileChange"
                    >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                     <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                  <el-radio-group v-model="formData.status">
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
export default {
  name: 'add',
  data(){
    return {
        dialogImageUrl: '',
        dialogVisible: false,
        formData:{
            title:"",
            img:"",
            status:1
        },
        formRules:{
            title:{required:true,message:'请输入轮播图名称',trigger:'blur'}
        }
    }
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      fileChange(file){
        //   raw图片的详细信息
          this.formData.img=file.raw;
      },
      limitTips(){
        this.$error('此处只能上传一张图片')
      },
      submitForm(){
          this.$refs.addForm.validate(async valid=>{
              if(valid){
                  const fd=new FormData();
                  for(let key in this.formData){
                      fd.append(key,this.formData[key]);
                  }
                  const res=await this.$http.post("/api/banneradd",fd)
                  if(res.code==200){
                    this.$success('添加成功');
                    this.$router.push("/banner")
                  }else{
                      this.$error('添加失败')
                  }
              }
          })
      },
      resetForm(){
          this.$refs.addForm.resetFields();
      }
  }
}
</script>
<style scoped>
.el-form{
    width: 700px;
    margin: auto;
}
</style>
