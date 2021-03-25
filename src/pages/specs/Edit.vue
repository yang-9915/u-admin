<template>
  <div class='edit'>
      <el-card>
          <el-form label-width="180px" :model="specsInfo" ref="addForm" :rules="specsRules">
              <el-form-item label="属性名" prop="specsname">
                  <el-input placeholder="请输入属性名" v-model="specsInfo.specsname"></el-input>
              </el-form-item>
              <el-form-item label="属性值" prop="attrs">
                  <div class="addArr" v-for="(item,index) in specsArr" :key="index">
                    <el-input placeholder="请输入属性值" v-model="item.value"></el-input>
                    <el-button type="success" v-if="index==0" @click="addArr">添加属性</el-button>
                    <el-button type="danger" v-else @click="delArr(index)">删除属性</el-button>
                  </div>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                  <el-radio-group v-model="specsInfo.status">
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
import {getSpecsById} from "../../request/specs"
export default {
  name: 'add',
  data(){
    var validateAttr=(rule,value,callback)=>{
        this.specsArr.forEach(item => {
            if(item.value==''){
                callback(new Error('请输入属性值！'));
            }
        });
        callback();
    }
    return {
        specsArr:[{value:""}],
        specsInfo:{
            id:this.$route.params.id,
            specsname:"",
            attrs:"",
            status:1
        },
        specsRules:{
            specsname:{required:true,message:'请输入属性名',trigger:"blur"},
            attrs:{validator:validateAttr,trigger:'blur'}
        }
    }
  },
  created(){
      this.getInfoById()
  },
  methods: {
      addArr(){
          if(this.specsArr.length>=5){
              return false;
          }
          this.specsArr.push({value:''})
      },
      delArr(index){
          this.specsArr.splice(index,1)
      },
      submitForm(){
        this.$refs.addForm.validate(valid=>{
            if(valid){
                this.specsInfo.attrs=this.specsArr.map(item=>item.value).join(',');
                this.$http.post("/api/specsedit",this.specsInfo).then(res=>{
                    if(res.code==200){
                        this.$success("修改成功")
                    }else{
                        this.$error('修改失败')
                    }
                })
            }else{
                console.log("校验失败")
            }
        })    
      },
      resetForm(){
          this.$refs.addForm.resetFields();
          this.specsArr=[{value:""}]
      },
      async getInfoById(){
          const res=await getSpecsById(this.specsInfo.id)
          if(res){
              this.specsInfo=res[0];
              this.specsArr=res[0].attrs.map(item=>({value:item}))
          }
      }
  }
}
</script>
<style scoped>
.el-form{
    width: 610px;
    margin: auto;
}
.addArr{
    display: flex;
    margin: 5px 0;
}
.addArr .el-input{
    width: 320px;
}
.addArr .el-button{
    margin-left: 10px;
}
</style>