<template>
  <div class='index'>
    <el-button @click="$router.push('/specs/add')" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
      <el-card>
          <el-table :data="list">
            <el-table-column label="ID" prop="id">
              
            </el-table-column>
            <el-table-column label="属性名称" prop="specsname">

            </el-table-column>
            <el-table-column label="属性值" prop="attrs">
              <template v-slot="scope">
                <el-tag type="success" v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="status">
              <template v-slot="scope">
                <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
                <el-tag type="danger" v-else>禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button @click="edit(scope.row.id)" type="success" circle size="mini" icon="el-icon-edit"></el-button>
                <el-button @click="del(scope.row.id)" type="danger" circle size="mini" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-card>
  </div>
</template>

<script>
import {getSpecsInfo} from "../../request/specs"
export default {
  name: 'index',
  data(){
    return {
      list:[],
      page:1,
      size:1
    }
  },
  created(){
    this.getInfo();
  },
  methods: {
    edit(id){
      this.$router.push(`/specs/${id}`)
    },
    del(id){
      this.$myConfirm(async ()=>{
        const res=await this.$http.post("/api/specsdelete",{id})
        if(res.code==200){
          this.$success('删除成功')
        }else{
          this.$error('删除失败')
        }
        const index=this.list.findIndex(item=>item.id==id);
        this.list.splice(index,1)
      })
    },
    async getInfo(){
      const info=await getSpecsInfo();
      if(info){
        this.list=info;
      }
    }
  }
}
</script>
<style scoped>
.el-button{
  margin-bottom: 10px;
}
.el-tag{
  margin: 0 2px;
}
</style>
