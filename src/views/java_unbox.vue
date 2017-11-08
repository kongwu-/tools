<template>
  <div>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-form label-width="80px">
  <el-form-item label="APPID">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="SIGN">
    <el-input></el-input>
  </el-form-item>
  <el-form-item label="MSG">
    <el-input></el-input>
  </el-form-item>
</el-form>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>
<script>
var AES = require("crypto-js/aes");
var ECB = require("crypto-js/mode-ecb");
var PKCS7 = require("crypto-js/pad-pkcs7");
var BASE64 = require("crypto-js/enc-base64");
var UTF8 = require("crypto-js/enc-utf8");


// var words = BASE64.stringify('1234');
// alert(words);
// console.debug(ciphertext.toString(BASE64));
     export default{
       created(){
         var ciphertext = AES.encrypt('1', UTF8.parse('1111111111111111'), { mode: ECB, padding: PKCS7});
         console.debug(ciphertext.toString());
       }
     }
</script>
