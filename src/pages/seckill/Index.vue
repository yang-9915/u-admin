<template>
  <div class='index'>
      <el-button @click="$router.push('/seckill/add')" type="primary" icon="el-icon-circle-plus-outline">添加秒杀</el-button>
      <el-card>
          <el-table :data="list" style="width:100%">
              <el-table-column label="活动名称" prop="title" min-width="180"></el-table-column>
              <el-table-column label="开始时间" prop="begintime" min-width="180">
                  <template v-slot="scope">
                      {{scope.row.begintime/1000|Time}}
                  </template>
              </el-table-column>
              <el-table-column label="结束时间" prop="endtime" min-width="180">
                  <template v-slot="scope">
                      {{scope.row.endtime/1000|Time}}
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
                      <el-button @click="$router.push(`/seckill/${scope.row.id}`)" type="success" circle size="mini" icon="el-icon-edit"></el-button>
                      <el-button @click="del(scope.row.id)" type="danger" circle size="mini" icon="el-icon-delete"></el-button>
                  </template>
              </el-table-column>
          </el-table>
      </el-card>
  </div>
</template>

<script>
import {getSeckillList} from "../../request/seckill"
export default {
  name: 'index',
  data(){
    return {
        list:[]
    }
  },
  created(){
      this.getList();
  },
  methods: {
      del(id){
          this.$myConfirm(async ()=>{
              const res= await this.$http.post("/api/seckdelete",{id});
              if(res.code==200){
                  this.$success('删除成功');
                  const index=this.list.findIndex(item=>item.id==id);
                  this.list.splice(index,1)
              }else{
                  this.$error('删除失败')
              }
          })
      },
      async getList(){
          const res=await getSeckillList();
          if(res){
              this.list=res;
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
