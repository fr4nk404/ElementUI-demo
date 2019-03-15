<template>
  <div id="app">
    <el-container>
      <el-aside class="ea" width="20%">
        <div class="user" id="user" style="margin-top: 30%">
          <div class="info_text" style="width: 70%; display: inline-block; float: left;">
            <h3>Frank</h3>
            <h4>fr4nk404@gmail.com</h4>
          </div>
          <div class="avator_box">
              <img src="./assets/photo.png" alt="logo" style="width: 30%; height: 100%;" />
          </div>
        </div>

        <div id="nav" class="nav" style="margin-top: 40%; ">
            <el-menu :router="true" :default-active="this.$route.path" @select="handleSelect">
                <el-submenu index="1">
                    <template slot="title" >插件管理</template>
                    <el-menu-item-group>
                        <el-menu-item  index="/pluginslist">插件列表</el-menu-item>
                        <el-menu-item index="/myplugins">我的插件</el-menu-item>
                        <el-menu-item index="/reviews">我的Review</el-menu-item>
                        <el-menu-item index="/checking">我的Check</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/templates" >模板管理</el-menu-item>
                <el-menu-item index="3-1">重新登录</el-menu-item>
            </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header style="height: 171px; text-align: right; font-size: 12px;  position: relative;">
            <h2 style="position: absolute; bottom: 20%; right: 10%; font-family: Arial ; font-weight: lighter; font-size: 20px; color: white">Welcome to F_Demo !</h2>
            <span style="position: absolute; bottom: 10%; right: 10%; font-weight: normal; font-family: 'Songti TC';  color: white">来看看我们可以做些什么</span>
        </el-header>

        <el-main>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.ea {
    color: #333;
    border-right: 1px solid #B3C0D1 ;
}

</style>


<script>
  export default {
      data() {

          const item = {
              name: 'Frank',
              address: 'fr4nk404@gmail.com'
          };

          return {
              tableData: Array(20).fill(item)
          }
      },
      methods: {
          handleSelect(key) {
              console.log(key);
          }
      }

  }

</script>


