import $axios from "../common/http"
export async function getSeckillList(){
    const res=await $axios.get("/api/secklist");
    if(res.code==200){
        return res.list;
    }
    return false;
}
export async function getSeckillById(id){
    const res=await $axios.get("/api/seckinfo",{params:{id}});
    if(res.code==200){
        return res.list;
    }
    return false;
}