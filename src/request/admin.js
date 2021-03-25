import $axios from "../common/http";

// 获取管理员列表
export async function getAdminList(data){
    const res=await $axios.get("/api/userlist",{params:data})
    if(res.code==200){
        return res.list
    }
    return false
}
// 获取管理员总条数
export async function getAdminCount(){
    const res=await $axios.get("/api/usercount")
    if(res.code==200){
        return res.list
    }
    return false
}

export async function getAdminId(uid){
    const res=await $axios.get(`/api/userinfo?uid=${uid}`)
    if(res.code==200){
        return res.list
    }
    return false;
} 