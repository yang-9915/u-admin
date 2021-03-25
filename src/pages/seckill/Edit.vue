<template>
  <div class='edit'>
      <el-card>
          <el-form label-width="180px" :model="formData" :rules="formRules" ref="addForm">
              <el-form-item label="活动名称" prop="title">
                  <el-input placeholder="请输入" v-model="formData.title"></el-input>
              </el-form-item>
              <el-form-item label="活动时间">
                  <template>
                      <div class="block">
                        <el-date-picker
                        v-model="value"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        @change="getTime"
                        >
                        </el-date-picker>
                    </div>
                  </template>
              </el-form-item>
              <el-form-item label="一级分类" prop="first_cateid">
                  <el-select v-model="formData.first_cateid" @change="firstCateChange">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="item in cateList" :key="item.id" :value="item.id" :label="item.catename"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="二级分类" prop="second_cateid">
                  <el-select v-model="formData.second_cateid" @change="secondCateChange">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="item in secondCateList" :key="item.id" :value="item.id" :label="item.catename"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="选择商品" prop="goodsid">
                  <el-select v-model="formData.goodsid">
                    <el-option value label="请选择"></el-option>
                    <el-option v-for="item in glist" :key="item.id" :value="item.id" :label="item.goodsname"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="formData.status">
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="2">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm">立即修改</el-button>
                  <el-button @click="resetForm">重置</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import $axios from "../../common/http"
import {getCategoryList} from "../../request/category";
import {getGoodsList} from "../../request/goods";
import {getSeckillById} from "../../request/seckill"
export default {
  name: 'edit',
  data(){
    return {
      cateList:[],
      secondCateList:[],
      goodsList:[],
      glist:[],
      formData:{
          id:this.$route.params.id,
          title:"",
          begintime:"",
          endtime:"",
          first_cateid:"",
          second_cateid:"",
          goodsid:"",
          status:1
      },
      formRules:{
          title:{required:true,message:'请输入活动名称',trigger:'blur'},
          first_cateid:{required:true,message:'请选择',trigger:'blur'},
          second_cateid:{required:true,message:'请选择',trigger:'blur'},
          goodsid:{required:true,message:'请选择',trigger:'blur'},
      },
      pickerOptions: {
        shortcuts: [{
          text: '1天内',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', [end,start]);
          }
        }, {
          text: '3天内',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 3);
            picker.$emit('pick', [end,start]);
          }
        }, {
          text: '1周内',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [end,start]);
          }
        }]
      },
      value:[]
    }
  },
  async created(){
      const res=await $axios.all([getCategoryList(),getGoodsList(),getSeckillById(this.formData.id)]);
      if(res){
          [this.cateList,this.goodsList,this.formData]=res;
      }
  },
  methods: {
      submitForm(){
        this.$refs.addForm.validate(async valid=>{
          if(valid){
            this.formData.begintime=this.value[0].getTime()
            this.formData.endtime=this.value[1].getTime()
            const res=await this.$http.post("/api/seckedit",{...this.formData,id:this.$route.params.id});
            if(res.code==200){
              this.$success('修改成功');
              this.$router.push('/seckill')
            }else{
              this.$error('修改失败')
            }
          }
        })
      },
      resetForm(){
        this.$refs.addForm.resetFields();
        this.value=""
      },
      firstCateChange(id){
          const index=this.cateList.findIndex(item=>item.id==id);
          this.secondCateList=this.cateList[index].children;
      },
      secondCateChange(sid){
        const arr=[];
        this.goodsList.forEach(el => {
          if(el.second_cateid==sid){
            arr.push({
              second_cateid:el.second_cateid,
              goodsname:el.goodsname
            })
          }
          this.glist=arr
        });
      },
      getTime(val){
        this.formData.value=val
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
