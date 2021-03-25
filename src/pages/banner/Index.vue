<template>
  <div class='banner'>
      <el-button @click="$router.push('/banner/add')" type="primary" icon="el-icon-circle-plus-outline">添加轮播</el-button>
      <el-card>
          <el-table :data="list" style="width:100%">
              <el-table-column label="轮播图名称" prop="title" min-width="180"></el-table-column>
              <el-table-column label="图片" prop="img" min-width="180">
                  <template v-slot="scope">
                      <el-image :src="$imgBaseUrl+scope.row.img" style="width:60px"></el-image>
                  </template>
              </el-table-column>
              <el-table-column label="状态" prop="status" min-width="180">
                  <template v-slot="scope" min-width="80">
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
import { getBannerList } from "../../request/banner";
export default {
  name: 'banner',
  data(){
    return {
        list:[]
    }
  },
  created(){
      this.getList();
  },
  methods: {
      edit(id){
          this.$router.push(`/banner/${id}`)
      },
      del(id){
          this.$myConfirm(async ()=>{
              const res=await this.$http.post("/api/bannerdelete",{id});
              if(res.code==200){
                  this.$success('删除成功');
                  const index=this.list.findIndex(item=>item.id==id);
                  this.list.splice(index,1);
              }else{
                  this.$error('删除失败')
              }
          })
      },
      async getList(){
          const list=await getBannerList();
          if(list){
              this.list=list;
          }
      }
  }
}
</script>
<style>
.el-button{
    margin-bottom: 10px;
}
.el-table td, .el-table th{
    text-align:center !important;
}
</style>
