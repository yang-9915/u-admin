<template>
  <div class="layout">
    <fullscreen ref="fullscreen">
      <el-container>
        <el-aside :width="asideWidth">
          <h3 class="logo-text">小U商城后台</h3>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#262a32"
            text-color="#f1f1f1"
            active-text-color="#fff"
            router
            :collapse="isCollapse"
            :collapse-transition='false'
            :unique-opened="true"
          >
            <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/admin">管理员管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商城设置</span>
              </template>
              <el-menu-item index="/category">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>图表展示</span>
              </template>
              <el-menu-item index="/bar">柱状图</el-menu-item>
              <el-menu-item index="/pie">饼状图</el-menu-item>
              <el-menu-item index="/line">折线图</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <div class="header-left">
              <el-button @click="isCollapse=!isCollapse" type="primary" icon="el-icon-s-fold" size="mini"></el-button>

                <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
              </el-breadcrumb>

              <el-button @click="$router.go(-1)" size="mini" circle plain icon="el-icon-back"></el-button>
          </div>

          <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo"><i class="el-icon-user"></i>个人信息</el-dropdown-item>
              <el-dropdown-item command="fullscreen"><i class="el-icon-full-screen"></i>全屏预览</el-dropdown-item>
              <el-dropdown-item command="logout"><i class="el-icon-switch-button"></i>安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
            
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </fullscreen>
  </div>
</template>

<script>
import Vue from "vue"
import fullscreen from "vue-fullscreen";
Vue.use(fullscreen);
export default {
  name: "layout",
  data() {
    return {
      isCollapse:false,
    };
  },
  components: {},
  created() {
    // console.log(this.$route.meta.title)
  },
 computed:{
   asideWidth(){
     return this.isCollapse?'64px':'226px';
   }
 },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command){
      // console.log(command)
      this[command]();
    },
    userInfo(){

    },
    fullscreen(){
      this.$refs.fullscreen.toggle();
    },
    logout(){
      // console.log("logout")
      sessionStorage.removeItem('userinfo');
      this.$router.push('/login')
    }
  },
};
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  z-index: 999;
  color: #333;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {

  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.logo-text {
  text-align: center;
  line-height: 60px;
  background: #444;
  color: #fff;
  font-weight: normal;
  letter-spacing: 4px;
  overflow: hidden;
  white-space: nowrap;
}
.el-menu-vertical-demo {
  height: calc(100vh - 60px);
}
.el-menu-vertical-demo li{
  text-align: left;
}
.is-active{
  background: #409eff!important;
}
.header-left{
  display: flex;
  align-items: center;
}
.header-left .el-breadcrumb{
  margin: 0 10px;
}
.el-menu{
  border-right: 0;
}
</style>
