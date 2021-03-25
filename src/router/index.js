import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Menu from "@/pages/menu/Index"
import menuAdd from "@/pages/menu/Add"
import Edit from "@/pages/menu/Edit"
import Role from "@/pages/role/Index"
import roleAdd from "@/pages/role/Add"
import roleEdit from "@/pages/role/Edit"
import Admin from "@/pages/admin/Index"
import adminAdd from "@/pages/admin/Add"
import adminEdit from "@/pages/admin/Edit"
import Category from "@/pages/category/Index"
import cgAdd from "@/pages/category/Add"
import cgEdit from "@/pages/category/Edit"
import Specs from "@/pages/specs/Index"
import specsAdd from "@/pages/specs/Add"
import specsEdit from "@/pages/specs/Edit"
import Goods from "@/pages/goods/Index"
import goodsAdd from "@/pages/goods/Add"
import goodsEdit from "@/pages/goods/Edit"
import Member from "@/pages/member/Index"
import memberEdit from "@/pages/member/Edit"
import Banner from "@/pages/banner/Index"
import bannerAdd from "@/pages/banner/Add"
import bannerEdit from "@/pages/banner/Edit"
import Seckill from "@/pages/seckill/Index"
import seckillAdd from "@/pages/seckill/Add"
import seckillEdit from "@/pages/seckill/Edit"

import Bar from "@/pages/charts/Bar"
import Pie from "@/pages/charts/Pie"
import Line from "@/pages/charts/Line"
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect:"/home",
      children:[
        {
          path:'/home',
          component:Home,
          meta:{
            title:'销售业绩统计'
          }
        },
        {
          path:'/menu',
          component:Menu,
          meta:{
            title:'菜单管理'
          }
        },
        {
          path:'/menu/add',
          component:menuAdd,
          meta:{
            title:'菜单管理添加'
          }
        },
        {
          path:'/menu/:id',
          component:Edit,
          meta:{
            title:'菜单管理编辑'
          }
        },
        {
          path:'/role',
          component:Role,
          meta:{
            title:'角色管理'
          }
        },
        {
          path:'/role/add',
          component:roleAdd,
          meta:{
            title:'角色管理添加'
          }
        },
        {
          path:'/role/:id',
          component:roleEdit,
          meta:{
            title:'角色管理编辑'
          }
        },
        {
          path:'/admin',
          component:Admin,
          meta:{
            title:'管理员管理'
          }
        },
        {
          path:'/admin/add',
          component:adminAdd,
          meta:{
            title:'管理员管理添加'
          }
        },
        {
          path:'/admin/:id',
          component:adminEdit,
          meta:{
            title:'管理员管理编辑'
          }
        },
        {
          path:'/category',
          component:Category,
          meta:{
            title:'商品分类'
          }
        },
        {
          path:'/category/add',
          component:cgAdd,
          meta:{
            title:'商品分类添加'
          }
        },
        {
          path:'/category/:id',
          component:cgEdit,
          meta:{
            title:'商品分类编辑'
          }
        },
        {
          path:'/specs',
          component:Specs,
          meta:{
            title:'商品规格'
          }
        },
        {
          path:'/specs/add',
          component:specsAdd,
          meta:{
            title:'商品规格添加'
          }
        },
        {
          path:'/specs/:id',
          component:specsEdit,
          meta:{
            title:'商品规格编辑'
          }
        },
        {
          path:'/goods',
          component:Goods,
          meta:{
            title:'商品管理'
          }
        },
        {
          path:'/goods/add',
          component:goodsAdd,
          meta:{
            title:'商品管理添加'
          }
        },
        {
          path:'/goods/:id',
          component:goodsEdit,
          meta:{
            title:'商品管理编辑'
          }
        },
        {
          path:'/member',
          component:Member,
          meta:{
            title:'会员管理'
          }
        },
        {
          path:'/member/:id',
          component:memberEdit,
          meta:{
            title:'会员管理编辑'
          }
        },
        {
          path:'/banner',
          component:Banner,
          meta:{
            title:'轮播图管理'
          }
        },
        {
          path:'/banner/add',
          component:bannerAdd,
          meta:{
            title:'轮播图添加'
          }
        },
        {
          path:'/banner/:id',
          component:bannerEdit,
          meta:{
            title:'轮播图编辑'
          }
        },
        {
          path:'/seckill',
          component:Seckill,
          meta:{
            title:'秒杀活动'
          }
        },
        {
          path:'/seckill/add',
          component:seckillAdd,
          meta:{
            title:'秒杀活动添加'
          }
        },
        {
          path:'/seckill/:id',
          component:seckillEdit,
          meta:{
            title:'秒杀活动编辑'
          }
        },
        {
          path:'/bar',
          component:Bar,
          meta:{
            title:'柱状图演示'
          }
        },
        {
          path:'/pie',
          component:Pie,
          meta:{
            title:'饼状图演示'
          }
        },
        {
          path:'/line',
          component:Line,
          meta:{
            title:'折线图演示'
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        title:'登录界面'
      }
    }
  ]
})
router.beforeEach((to,from,next)=>{
  // console.log(to,from)
  if(to.path!="/login"){
    const userinfo=JSON.parse(sessionStorage.getItem('userinfo')||'{}')
    if(!userinfo.token){
      return next('/login')
    }
    return next()
  }
  next()
})
export default router;
