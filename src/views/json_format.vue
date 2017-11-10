<template>
<div>
  <el-row>
    <el-col :span="10">
      <div>
        <el-input @keyup.native="jsonBuild" v-model="jsonPlain" type="textarea" :rows="26" placeholder="请输入json格式参数"></el-input>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple-light">
        <ul class="transfer">
          <li>
            <el-button icon="el-icon-document" round data-clipboard-target="#format-wrapper" class="clipboard">复制</el-button>
          </li>
        </ul>


      </div>
    </el-col>
    <el-col :span="10">
      <div class="grid-content bg-purple">
        <div class="grid-content bg-purple-light" style="margin-top:20px;" v-html="formatJson" id="format-wrapper"></div>
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
import Clipboard from 'clipboard'
import JSONFormat from '@/components/jquery.json.js';
export default {
  data() {
    return {
      formatJson: null,
      jsonPlain: null
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
    jsonBuild() {
      let vm = this;
      try {
        let plain = vm.jsonPlain;
        if(plain.indexOf('"')==0){
            plain = plain.substring(1,plain.length-1).replace(/\\/g,"");
        }
        vm.formatJson = new JSONFormat(plain, 4).toString();
      } catch (e) {
        vm.formatJson = '';
      }

    }
  }
}
</script>
