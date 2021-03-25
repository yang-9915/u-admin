import Vue from "vue"
import axios from "axios";
import {Message} from "element-ui"
// 请求拦截器
axios.interceptors.request.use(function(config){
  const userInfo=JSON.parse(sessionStorage.getItem('userinfo')||'{}')
  config.headers.authorization=userInfo.token;
  return config;
})
// 响应拦截器
axios.interceptors.response.use(function(config){
  // console.log(config)
  if(config.data.code!=200){
    Message({
      type:'error',
      message:config.data.msg
    });
    location.href='#/login';
  }

  return config.data;
})
Vue.prototype.$http=axios
// 导出axios
export default axios;