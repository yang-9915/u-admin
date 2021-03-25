import $axios from "../common/http";
export async function getBannerList(){
    const res=await $axios.get("/api/bannerlist");
    if(res.code==200){
        return res.list;
    }
    return false;
}
export async function getBannerById(id){
    const res=await $axios.get("/api/bannerinfo",{params:{id}});
    if(res.code==200){
        return res.list;
    }
    return false;
}