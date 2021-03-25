import $axios from "../common/http";
export async function getmemberList(){
    const res=await $axios.get("/api/memberlist");
    if(res.code==200){
        return res.list;
    }
    return false;
}