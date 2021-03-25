<template>
  <div class='index'>
      <el-button 
        type="primary" 
        icon="el-icon-circle-plus-outline"
        @click="$router.push('/admin/add')"
        >添加</el-button>
      <el-card>
          <el-table
            :data="list"
            style="width: 100%">
            <el-table-column prop="uid" label="用户ID" min-width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名" min-width="180">
            </el-table-column>
            <el-table-column prop="rolename" label="角色名称" min-width="180">
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="180">
                <template v-slot="scope">
                    <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="success" size="mini" circle icon="el-icon-edit" @click="edit(scope.row.uid)"></el-button>
                <el-button type="danger" size="mini" circle icon="el-icon-delete" @click="del(scope.row.uid)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="size"
            @current-change="pageChange">
        </el-pagination>
      </el-card>
  </div>
</template>

<script>
import {getAdminList,getAdminCount} from "../../request/admin"
export default {
  name: 'index',
  data(){
    return {
        list:[],
        page:1,
        size:2,
        total:1000
    }
  },
  created(){
      this.getCount();
      this.queryList()
  },
  methods: {
      edit(uid){
        this.$router.push("/admin/"+uid)
      },
      del(uid){
        this.$myConfirm(async ()=>{
          const res=await this.$http.post("/api/userdelete",{uid});
          if(res.code==200){
            const index=this.list.findIndex(item=>item.uid==uid)
            this.list.splice(index,1)
            this.$success('删除成功')
          }else{
            this.$error('删除失败')
          }
        })
      },
      async queryList(){
        const list=await getAdminList({page:this.page,size:this.size});
        if(list){
            this.list=list
        }
      },
      async getCount(){
        const total=await getAdminCount();
    //   console.log(total)
        this.total=total[0].total;
      },
      pageChange(page){
          this.page=page;
          this.queryList()
      }
  }
}
</script>
<style scoped>
.el-button{
    margin-bottom: 10px;
}
.el-pagination{
    margin-top: 20px;
}
</style>
