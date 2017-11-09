<template>
<div>
  <el-row>
    <el-col :span="10">
      <div class="grid-content bg-purple">
        <el-form label-width="80px" :model="paramsModel">
          <el-form-item label="APPID" :rules="{required: true}">
            <el-select v-model="paramsModel.appId" placeholder="请选择">
              <el-option v-for="app in apps" :key="app.appId" :label="app.label" :value="app.appId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="SIGN" :rules="{required: true}">
            <el-input v-model="paramsModel.sign"></el-input>
          </el-form-item>
          <el-form-item label="MSG" :rules="{required: true}">
            <el-input v-model="paramsModel.msg" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <div class="line"></div>
          <el-form-item label="QUERY">
            <el-input v-model="queryString" type="textarea" :rows="6" @keyup.native="queryBuild" placeholder="请输入queryString格式参数，例如appId=xx&sign=xx&msg=xx"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple-light">
        <ul class="transfer">
          <li>
            <el-button type="warning" icon="el-icon-view" round @click="validateSign">验签</el-button>
          </li>
          <li>
            <el-button type="primary" icon="el-icon-arrow-right" round @click="decrypt">解密</el-button>
          </li>
          <li>
            <el-button icon="el-icon-document" round data-clipboard-target="#format-wrapper" class="clipboard">复制</el-button>
          </li>
        </ul>


      </div>
    </el-col>
    <el-col :span="10">
      <div class="grid-content bg-purple-light" v-html="formatJson" id="format-wrapper"></div>
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
      queryString:null
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
    queryBuild(){
      let vm = this;
      var queryString = vm.queryString;
      queryString.split('&').forEach((item)=>{
        let splitParam = item.split('=');
        let key = splitParam[0];
        let val = decodeURIComponent(splitParam[1]);
        if(key=='appId'){
          vm.paramsModel.appId = val;
        }else if(key=="sign"){
          vm.paramsModel.sign = val;
        }else if(key=="msg"){
          vm.paramsModel.msg = val;
        }
      });
      vm.decrypt();
    },
    secret() {},
    decrypt() {
      let vm = this;
      let secret;
      apps.forEach((app) => {
        if (app.appId == vm.paramsModel.appId) {
          secret = app.secret;
        }
      })
      let encodeSign = MD5(vm.paramsModel.msg + secret).toString();
      if (encodeSign != vm.paramsModel.sign) {
        vm.$message.error('签名错误');
        return;
      } else {
        let decrypted = UTF8.stringify(AES.decrypt(vm.paramsModel.msg, UTF8.parse(secret), {
          mode: ECB,
          padding: PKCS7
        }));
        try {
          vm.formatJson = new JSONFormat(decrypted, 4).toString();
        } catch (e) {
          vm.$message.error('解析错误');
        }
      }
    },
    validateSign() {
      let vm = this;
      let secret;
      apps.forEach(app => {
        if (app.appId == vm.paramsModel.appId) {
          secret = app.secret;
        }
      })
      let encodeSign = MD5(vm.paramsModel.msg + secret).toString();
      if (encodeSign != vm.paramsModel.sign) {
        vm.$message.error('签名错误');
      } else {
        vm.$message({
          message: '验证通过',
          type: 'success'
        });
      }
    }
  }
}
</script>
