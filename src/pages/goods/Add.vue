<template>
  <div class='add'>
      <el-card>
          <el-form label-width="120px" :model="formData" :rules="rules" ref="addForm">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane class="el-tab-pane1" label="基本信息" name="first">
                <el-form-item label="一级分类" prop="first_cateid">
                  <el-select v-model="formData.first_cateid" @change="firstCateChange">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="item in cateList" :key="item.id" :value="item.id" :label="item.catename"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="二级分类" prop="second_cateid">
                  <el-select v-model="formData.second_cateid">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="item in secondCateList" :key="item.id" :value="item.id" :label="item.catename"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="goodsname">
                  <el-input placeholder="请输入商品名称" v-model="formData.goodsname"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="price">
                  <el-input placeholder="请输入商品价格" v-model="formData.price"></el-input>
                </el-form-item>
                <el-form-item label="市场价格" prop="market_price">
                  <el-input placeholder="请输入市场价格" v-model="formData.market_price"></el-input>
                </el-form-item>
                <el-form-item label="商品图片" prop="img">
                  <el-upload
                    action="#"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :auto-upload="false"
                    :on-change="fileChange"
                    :limit="1"
                    :on-exceed="limitTips"
                    :file-list="goodsImgList"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </el-form-item>
                <el-form-item label="商品规格" prop="specsid">
                  <el-select v-model="formData.specsid" @change="changeSpecs">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="item in specsList" :key="item.id" :value="item.id" :label="item.specsname"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="规格属性值" prop="specsattr">
                  <el-select v-model="formData.specsattr" multiple>
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="(item,index) in specsAttr" :key="index" :value="item" :label="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否新品" prop="isnew">
                  <el-radio-group v-model="formData.isnew">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否热卖" prop="ishot">
                  <el-radio-group v-model="formData.ishot">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-radio-group v-model="formData.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="详细描述" name="second">
                <el-form-item prop="description" label-width='0'>
                  <vue-wangeditor ref="editor" width="100%" style="height:500px" v-model="formData.description" id="editor"></vue-wangeditor>
                </el-form-item>
              </el-tab-pane>
            </el-tabs>
            <el-form-item>
              <el-button type="primary" @click="submitForm">立即提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import vueWangeditor from "vue-wangeditor";
import $axios from "../../common/http";
import {getCategoryList} from "../../request/category";
import {getSpecsInfo} from "../../request/specs";
export default {
  name: 'add',
  data(){
    const validDesc=(rule,value,callback)=>{
      const html=this.$refs.editor.getHtml();
      if(html.trim()=='<p><br></p>'){
        return callback(new Error('请输入商品介绍'))
      }
      callback();
    }
    return {
      goodsImgList:[],
      cateList:[],
      secondCateList:[],
      specsList:[],
      specsAttr:[],
      activeName:"first",
      dialogImageUrl:"",
      dialogVisible:false,
      formData:{
        first_cateid:"",
        second_cateid:"",
        goodsname:"",
        price:"",
        market_price:"",
        img:"",
        description:"",
        specsid:"",
        specsattr:"",
        isnew:"",
        ishot:"",
        status:""
      },
      rules:{
        first_cateid:{required:true,message:"请选择",trigger:"blur"},
        second_cateid:{required:true,message:"请选择",trigger:"blur"},
        goodsname:{required:true,message:"请填写",trigger:"blur"},
        price:{required:true,message:"请填写",trigger:"blur"},
        market_price:{required:true,message:"请填写",trigger:"blur"},
        description:{validator:validDesc,trigger:"blur"},
        specsid:{required:true,message:"请选择",trigger:"blur"},
        specsattr:{required:true,message:"请选择",trigger:"blur"},
        isnew:{required:true,message:"请选择",trigger:"blur"},
        ishot:{required:true,message:"请选择",trigger:"blur"},
        status:{required:true,message:"请选择",trigger:"blur"},
      }
    }
  },
  components: {vueWangeditor},
  created(){},
  mounted(){},
  methods: {
    submitForm(){
      this.$refs.addForm.validate(async valid=>{
        if(valid){
          const fd=new FormData();
          for(let key in this.formData){
            fd.append(key,this.formData[key]);
          }
          fd.append('description',this.$refs.editor.getHtml());
          const res=await this.$http.post('/api/goodsadd',fd);
          if(res.code==200){
            this.$success('新增成功');
            this.$router.push('/goods');
          }else{
            this.$error('新增失败');
          }
        }else{
          this.$error('请完善所有的表单信息')
        }
      })
    },
    resetForm(){
      this.$refs.addForm.resetFields();
      this.goodsImgList=[]
    },
    limitTips(){
      this.$error("此处最多只能上传一张图片")
    },
    fileChange(file){
      this.formData.img=file.raw;
    },
    changeSpecs(id){
      const index=this.specsList.findIndex(item=>item.id==id);
      this.specsAttr=this.specsList[index].attrs;
      this.formData.specsattr=[];
    },
    firstCateChange(id){
      const index=this.cateList.findIndex(item=>item.id==id);
      this.secondCateList=this.cateList[index].children;
    },
    handleClick(tab,event){
      console.log(tab,event)
    },
    handleRemove(file,fileList){
      console.log(file,fileList)
    },
    handlePictureCardPreview(file){
      this.dialogImageUrl=file.url;
      this.dialogVisible=true;
    }
  },
  async created(){
    const res=await $axios.all([getCategoryList(),getSpecsInfo()]);
    if(res){
      [this.cateList,this.specsList]=res;
    }
  }
}
</script>
<style scoped>
.el-tab-pane1{
  width: 600px;
  margin: auto;
}
</style>
