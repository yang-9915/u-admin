<template>
  <div class='index'>
      <el-button @click="$router.push('/goods/add')" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
      <el-card>
         <el-table
            :data="list"
            style="width: 100%">
            <el-table-column prop="firstcatename" label="一级分类" min-width="120">
            </el-table-column>
            <el-table-column prop="secondcatename" label="二级分类" min-width="120">
            </el-table-column>
            <el-table-column prop="goodsname" label="商品名称" min-width="120">
            </el-table-column>
            <el-table-column prop="img" label="商品图片" min-width="120">
                <template v-slot="scope">
                    <el-image :src="$imgBaseUrl+scope.row.img" :style="{width:'100px'}"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="销售价格" min-width="120">
                <template v-slot="scope">
                    <span>&yen;{{scope.row.price}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="market_price" label="市场价格" min-width="120">
                <template v-slot="scope">
                    <span style="color:orange">&yen;{{scope.row.market_price}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="isnew" label="是否新品" min-width="120">
                <template v-slot="scope">
                     <el-tooltip :content="scope.row.isnew==1?'是':'否'" placement="top">
                        <el-switch
                        @change="updateState(scope.row,'isnew')"
                        v-model="scope.row.isnew"
                        :active-value="1"
                        :inactive-value="0"
                        ></el-switch>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="ishot" label="是否热卖" min-width="120">
                <template v-slot="scope">
                     <el-tooltip :content="scope.row.ishot==1?'是':'否'" placement="top">
                        <el-switch
                        @change="updateState(scope.row,'ishot')"
                        v-model="scope.row.ishot"
                        :active-value="1"
                        :inactive-value="0"
                        ></el-switch>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="120">
                <template v-slot="scope">
                    <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
                    <el-tag type="danger" v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right"  min-width="120">
              <template v-slot="scope">
                <el-button type="success" size="mini" circle icon="el-icon-edit" @click="$router.push('/goods/'+scope.row.id)"></el-button>
                <el-button type="danger" size="mini" circle icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            :page-size="size"
            :page-sizes="[1,3,5,10]"
            layout="sizes,prev, pager, next"
            :total="total"
            @current-change="pageChange"
            @size-change="sizeChange">
        </el-pagination>
      </el-card>
  </div>
</template>

<script>
import {getGoodsList,getTotal,updateGoodsInfo,getGoodsById} from "../../request/goods"
export default {
  name: 'index',
  data(){
    return {
        list:[],
        page:1,
        size:10,
        total:0
    }
  },
  methods: {
      del(id){
        this.$myConfirm(async ()=>{
            const res=await this.$http.post("/api/goodsdelete",{id});
            if(res.code==200){
                this.$success('删除成功');
                const index=this.list.findIndex(item=>item.id==id);
                this.list.splice(index,1)
            }else{
                this.$error('删除失败')
            }
        })
      },
      async updateState(info,attr){
          let postData={id:info.id};
          postData[attr]=info[attr];
          const res=updateGoodsInfo(postData);
          if(res){
              this.$success('更新成功')
          }else{
              this.$error('更新失败')
          }
      },
      async getList(){
        const list=await getGoodsList({page:this.page,size:this.size})
        if(list){
            this.list=list;
        }
      },
      pageChange(page){
          this.page=page;
          this.getList();
      },
      sizeChange(size){
          this.size=size;
          this.getList();
      }
  },
  async created(){
        this.getList();
        this.total=await getTotal();
    }
}
</script>
<style scoped>
.el-button{
    margin-bottom: 10px;
}
</style>
