<template>
<div class="color-box-group">
  <div class="color-box bg-text-primary" @click="$router.push('/json-format')">Json格式化
    <!-- <div class="value">#2D2F33</div> -->
  </div>
  <div class="color-box bg-text-regular" @click="$router.push('/java-box')">Java加密
    <!-- <div class="value">#5A5E66</div> -->
  </div>
  <div class="color-box bg-text-secondary" @click="$router.push('/java-unbox')">Java解密
    <!-- <div class="value">#878D99</div> -->
  </div>
  <!-- <div class="color-box bg-text-placeholder">占位文字
    <div class="value">#B4BCCC</div>
  </div> -->
</div>
</template>
<style scoped>
.color-box-group{
  margin:150px auto;
  width:200px;
}
.color-box {
  cursor:pointer;
  border-radius: 4px;
  padding: 20px;
  height: 74px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  margin:15px 0;
}

.color-box .value {
  font-size: 12px;
  opacity: .69;
  line-height: 24px
}

.color-box-group .color-box {
  /*border-radius: 0*/
}

.color-box-group .color-box:first-child {
  /*border-radius: 4px 4px 0 0*/
}

.color-box-group .color-box:last-child {
  /*border-radius: 0 0 4px 4px*/
}

.bg-blue {
  background-color: #409eff
}

.bg-success {
  background-color: #67c23a
}

.bg-warning {
  background-color: #eb9e05
}

.bg-danger {
  background-color: #fa5555
}

.bg-info {
  background-color: #878d99
}

.bg-text-primary {
  background-color: #2d2f33
}

.bg-text-regular {
  background-color: #5a5e66
}

.bg-text-secondary {
  background-color: #878d99
}

.bg-text-placeholder {
  background-color: #b4bccc
}

.bg-border-base {
  background-color: #d8dce5
}

.bg-border-light {
  background-color: #dfe4ed
}

.bg-border-lighter {
  background-color: #e6ebf5
}

.bg-border-extra-light {
  background-color: #edf2fc
}

[class*=" bg-border-"] {
  color: #5a5e66
}
</style>
