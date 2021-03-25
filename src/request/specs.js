import $axios from "../common/http"

export async function getSpecsInfo(params){
    const res=await $axios.get("/api/specslist",params)
    if(res.code==200){
        return res.list
    }
    return false
}

export async function getSpecsById(id){
    const res=await $axios.get("/api/specsinfo",{params:{id}});
    if(res.code==200){
        return res.list
    }
    return false
}