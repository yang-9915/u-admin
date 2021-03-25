<template>
  <div class='index'>
      <el-button type="primary" @click="$router.push('/category/add')" icon="el-icon-circle-plus-outline">添加</el-button>
      <el-card>
          <el-table
            :data="list"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="id" label="ID" min-width="180">
            </el-table-column>
            <el-table-column prop="catename" label="分类名称" min-width="180">
            </el-table-column>
            <el-table-column prop="img" label="分类图片" min-width="180">
                 <template v-slot="scope">
                    <el-image v-if="scope.row.img!=''" :src="$imgBaseUrl+scope.row.img" :style="{width:'60px'}"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="180">
                <template v-slot="scope">
                    <el-tag type="success" v-if="scope.row.status==1">正常</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180">
                <template v-slot="scope">
                    <el-button @click="edit(scope.row.id)" type="success" circle icon="el-icon-edit" size="mini"></el-button>
                    <el-button @click="del(scope.row.id)" type="danger" circle icon="el-icon-delete" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-card>
  </div>
</template>

<script>
import {getCategoryList} from "../../request/category"
export default {
  name: 'index',
  data(){
    return {
        list:[]
    }
  },
  created(){
      this.getList()
  },
  methods: {
      edit(id){
          this.$router.push('/category/'+id)
      },
      del(id){
          this.$myConfirm(async ()=>{
              const res= await this.$http.post("/api/catedelete",{id});
              if(res.code==200){
                  const index=this.list.findIndex(item=>item.id==id)
                  this.list.splice(index,1)
                  this.$success('删除成功')
              }else{
                  this.$error('删除失败')
              }
          })
      },
      async getList(){
          const list = await getCategoryList();
          if(list){
              this.list=list;
          }
      }
  }
}
</script>
<style scoped>
.el-button{
    margin-bottom: 10px;
}
</style>
