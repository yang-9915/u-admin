import $axios from '../common/http';

// 获取商品列表
export async function getGoodsList(params){
    const res=await $axios('/api/goodslist',{params});
    if(res){
        return res.list;
    }
    return false;
}

// 获取数据总条数
export async function getTotal(){
    const res=await $axios('/api/goodscount');
    if(res.code==200){
        return res.list[0].total;
    }
    return false;
}

// 更新商品信息
export async function updateGoodsInfo(params){
    // 创建formdata实例
    const fd=new FormData();
    for(let key in params){
        fd.append(key,params[key])
    }
    const res=await $axios.post('/api/goodsedit',fd);
    if(res.code==200){
        return res.list;
    }
    return false;
}

// 根据id获取商品信息
export async function getGoodsById(id){
    const res=await $axios.get(`/api/goodsinfo?id=${id}`); 
    if(res.code==200){
        return res.list;
    }
    return false;
}