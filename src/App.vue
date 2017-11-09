<template>
  <div id="app">
    <el-container>
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal" :router="true">
<el-menu-item index="java-unbox">java解密</el-menu-item>
<el-menu-item index="java-box">java加密</el-menu-item>
</el-menu>
    </el-header>
    <el-main>
        <router-view/>
    </el-main>
  </el-container>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
