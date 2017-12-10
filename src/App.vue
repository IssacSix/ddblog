<template>
  <div id="app">
    <el-container>
			<el-header>
        <h1>{{ msg }}</h1>
        <login-box></login-box>
			</el-header>
			<el-container>
				<el-aside width="200px">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">小电影</span>
              </template>
              <el-menu-item-group title="电影详情">
                <el-menu-item index="1-1" route="movieList">Movie List</el-menu-item>
              </el-menu-item-group>
              </el-menu-item-group>
              <el-submenu index="1-2">
                <span slot="title">管理电影</span>
                  <el-menu-item index="1-2-1" route="movieAdmin">录入</el-menu-item>
                  <el-menu-item index="1-2-2" route="adminList">Admin List</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="setting">
              <i class="el-icon-setting"></i>
              <span slot="title" route="setting">设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
				<el-main>
           <router-view/>
        </el-main>
			</el-container>
		</el-container>
  </div>
</template>

<script>
import loginBox from '@/components/login'
export default {
  name: 'app',
  data () {
    return {
      msg: "Welcome to dingding's blog",
      isCollapse: false
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  components: {
    loginBox
  }
}
</script>

<style>
  a {
  	color: #000;
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  .el-container {
    width: 100%;
    min-height: 100vh;
    color: #000;
  }
  h1 {
    font-size: 24px;
    margin: 0;
  }
  .el-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
		background-color: #000;
		color: #fff;
		text-align: center;
	}
  
  .el-aside {
    color: #fff;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-menu { 
    background-color: none;
    color: #fff;
  }
</style>
