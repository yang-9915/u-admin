<template>
  <div class='index'>
      <el-card>
          <el-table :data="list" style="width: 100%">
            <el-table-column prop="uid" label="用户ID" min-width="300">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" min-width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="180">
            </el-table-column>
            <el-table-column prop="addtime" label="注册日期" min-width="180">
                <template v-slot="scope">
                    {{scope.row.addtime/1000|Time}}
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="80">
                <template>
                    <el-button type="success" size="mini" circle icon="el-icon-edit"></el-button>
                </template>
            </el-table-column>
          </el-table>
      </el-card>
  </div>
</template>

<script>
import {getmemberList} from "../../request/member";
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
     async getList(){
         const list= await getmemberList();
         if(list){
             this.list=list;
         }
     }
  }
}
</script>
<style>
.el-table td, .el-table th{
    text-align:center !important;
}
</style>
