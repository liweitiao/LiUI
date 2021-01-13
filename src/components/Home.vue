<template>
  <!-- <div>home</div> -->
  <el-container class="home-container">
    <el-aside width="200px" class="el-aside">
      <div class="title">商户信息系统</div>
      <el-menu
      :default-active="activePath"
      class="el-menu"
      text-color="#fff"
      router=""
      active-text-color="#ffd04b">
      <el-menu-item index="/tenant" class="el-menu-item" @click="saveNavState('/' + 'tenant')">
        <i class="el-icon-menu"></i>
        <span slot="title">承租人信息表</span>
      </el-menu-item>

      <el-menu-item index="/contract" class="el-menu-item" @click="saveNavState('/' + 'contract')">
        <i class="el-icon-menu"></i>
        <span slot="title">物业合同更名记录</span>
      </el-menu-item>

      <el-menu-item index="/manage" class="el-menu-item" @click="saveNavState('/' + 'manage')">
        <i class="el-icon-menu"></i>
        <span slot="title">经营信息</span>
      </el-menu-item>

      <el-menu-item index="/social" class="el-menu-item" @click="saveNavState('/' + 'social')">
        <i class="el-icon-menu"></i>
        <span slot="title">社会关系</span>
      </el-menu-item>

      <el-menu-item index="/member" class="el-menu-item" @click="saveNavState('/' + 'member')">
        <i class="el-icon-menu"></i>
        <span slot="title">会员荣誉</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-container>
      <!-- <el-header class="el-header">Header</el-header> -->
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      activePath: ''
    }
  },
  mounted () {
    // console.log(this.$route.path)
    this.activePath = this.$route.path
    // console.log(this.activePath)
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  created () {
    // console.log(this.$route.path)
    this.activePath = this.$route.path
    this.activePath = window.sessionStorage.getItem('activePath')
    window.sessionStorage.setItem('activePath', this.activePath)
  },
  methods: {
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
  // watch: {
  //   $route: {
  //     handler: (newVal, oldVal) => {
  //       console.log(newVal.path, oldVal)
  //       window.sessionStorage.setItem('activePath', newVal.path)
  //       console.log(this)
  //     }
  //   }
  // }
  beforeRouteUpdate (to, from, next) {
    // console.log('hashChange')
    // var activePath = window.sessionStorage.getItem('activePath')
    // console.log(to.path)
    this.activePath = to.path
    window.sessionStorage.setItem('activePath', to.path)
    next()
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  min-width: 1280px;
}

.el-aside{
  background-color: #333744;
  height: 100%;
}

.title{
  color:white;
  height: 60px;
  margin-left: 24px;
  line-height: 60px;
  font-size: 18px;
}

.el-header{
  height: 30px;
  background-color: aqua
}

.el-menu{
  margin-top: 10px;
  background-color: #333744;
  border: 1px solid #333744;
}

.el-menu .el-menu-item{
  background-color: #333744;
}

.el-menu .el-menu-item:hover{
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
</style>
