// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./common/http" 
import "./common/element"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/reset.css"
// 导入axios

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.filter('Time',(timestamp)=>{
  var date=new Date(timestamp*1000);
  var y=date.getFullYear()+"-";
  var m=(date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-';
  var d=(date.getDate()<10?'0'+(date.getDate()):date.getDate())+' ';
  var h=(date.getHours()<10?'0'+(date.getHours()):date.getHours())+':';
  var min=(date.getMinutes()<10?'0'+(date.getMinutes()):date.getMinutes())+':';
  var s=date.getSeconds()<10?'0'+(date.getSeconds()):date.getSeconds();
  return y+m+d+h+min+s;
})
// 将图片服务器的baseurl绑定到vue的原型对象上
Vue.prototype.$imgBaseUrl="http://localhost:3000";
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render: h => h(),
  components: { App },
  template: '<App/>'
})
