<template>
<div>
  <el-row>
    <el-col :span="10">
      <div>
        <el-input @keyup.native="jsonBuild" v-model="jsonPlain" type="textarea" :rows="6" placeholder="请输入json格式参数"></el-input>
      </div>
      <div class="grid-content bg-purple-light" style="margin-top:20px;" v-html="formatJson" id="format-wrapper"></div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple-light">
        <ul class="transfer">
          <li>
            <el-button type="primary" icon="el-icon-arrow-right" round @click="decrypt">加密</el-button>
          </li>
          <li>
            <el-button icon="el-icon-document" round data-clipboard-target="#format-wrapper" class="clipboard">复制</el-button>
          </li>
        </ul>


      </div>
    </el-col>
    <el-col :span="10">
      <div class="grid-content bg-purple">
        <el-form label-width="80px" :model="paramsModel">
          <el-form-item label="APPID" :rules="{required: true}">
            <el-select v-model="paramsModel.appId" placeholder="请选择">
              <el-option v-for="app in apps" :key="app.appId" :label="app.label" :value="app.appId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="SIGN">
            <el-input v-model="paramsModel.sign"></el-input>
          </el-form-item>
          <el-form-item label="MSG">
            <el-input v-model="paramsModel.msg" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <div class="line"></div>
          <el-form-item label="QUERY">
            <el-input v-model="queryString" type="textarea" :rows="6" placeholder="请输入queryString格式参数，例如appId=xx&sign=xx&msg=xx"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</div>
</template>
<style scoped>
.transfer {
  margin: auto;
}

.transfer li {
  padding: 10px;
  text-align: center;
}
</style>
<script>
var AES = require("crypto-js/aes");
var ECB = require("crypto-js/mode-ecb");
var PKCS7 = require("crypto-js/pad-pkcs7");
var BASE64 = require("crypto-js/enc-base64");
var MD5 = require("crypto-js/md5");
var UTF8 = require("crypto-js/enc-utf8");
import JSONFormat from '@/components/jquery.json.js';
import Clipboard from 'clipboard'
import {
  apps
} from '@/lib/options'
// var words = BASE64.stringify('1234');
// alert(words);
// console.debug(ciphertext.toString(BASE64));
export default {
  data() {
    return {
      apps: apps,
      paramsModel: {
        sign: null,
        msg: null,
        appId:"1000002"
      },
      formatJson: null,
      queryString:null,
      jsonPlain:null
    }
  },
  mounted() {
    this.initClipboard();
  },
  methods: {
    initClipboard: function() {
      let vm = this;
      let clipboard = new Clipboard('.clipboard');
      clipboard.on('success', function(e) {
        vm.$message({
          message: '复制成功',
          type: 'success'
        });
      });

    },
    jsonBuild(){
      let vm = this;
      try{
        vm.formatJson = new JSONFormat(vm.jsonPlain, 4).toString();
        vm.encrypt();
        vm.buildQueryString();
      }catch(e){
        vm.formatJson = '';
      }

    },
    secret() {},
    encrypt() {
      let vm = this;
      let secret;
      apps.forEach((app) => {
        if (app.appId == vm.paramsModel.appId) {
          secret = app.secret;
        }
      })
      let encrypted = AES.encrypt(vm.jsonPlain, UTF8.parse(secret), {
        mode: ECB,
        padding: PKCS7
      }).toString();
      vm.paramsModel.sign = MD5(encrypted+secret).toString();
      vm.paramsModel.msg = encrypted;
    },
    buildQueryString(){
      let vm = this;
      let queryString = 'appId=';
      queryString += encodeURIComponent(vm.paramsModel.appId);
      queryString += '&sign=';
      queryString += encodeURIComponent(vm.paramsModel.sign);
      queryString += '&msg=';
      queryString += encodeURIComponent(vm.paramsModel.msg);
      vm.queryString = queryString;
    }
  }
}
</script>
