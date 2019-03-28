<template>
    <el-container>
      <el-aside :width="asideWidth" >
        <connet-setting></connet-setting>
      </el-aside>
      <el-container>
        <i class="el-icon-menu menu-pos" @click="onMenu"></i>
          <el-header><h1 class="header-title">ADS测试工具</h1></el-header>
          <el-main>
            <div class="nav-button">
                <el-button size="small" type="primary" @click="onTestAds">通讯测试</el-button>
                <el-button size="small" type="warning" >断开连接</el-button>
                <el-button size="small" type="info" >设置</el-button>
            </div>
              <variable-items></variable-items>
              <el-button  class="add-item" type="primary" icon="el-icon-plus" circle @click="onAddOne"></el-button>
              <variable-info :addOne="showAdd" @close='onAddOneClose'></variable-info>   
          </el-main>
      </el-container>
    </el-container>
</template>

<script>
import {ipcRenderer} from 'electron'
import * as ipc from '@/../ipc'
import VariableItems from './components/VariableItems'
import VariableInfo from './components/VariableInfo'
import ConnetSetting from './components/ConnetSetting'
export default {
  data () {
    return {
      showAdd: false,
      asideWidth: '0'
    }
  },
  components: {
    VariableItems,
    VariableInfo,
    ConnetSetting

  },
  created () {
    ipcRenderer.on(ipc.TEST, (event, arg) => {
      let strArg = ''
      for (let item in arg) {
        strArg = strArg + '>' + item + ':' + arg[item] + ' <br />'
      }
      this.$alert(strArg, '测试结果', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true
      })
    })
  },
  methods: {
    onAddOne () {
      this.showAdd = true
    },
    onAddOneClose (val) {
      this.showAdd = false
    },
    onMenu () {
      if (this.asideWidth === '0') {
        this.asideWidth = '30%'
      } else {
        this.asideWidth = '0'
      }
    },
    onTestAds () {
      console.log('connecting')
      ipcRenderer.send(ipc.TEST)
    }
  }

}
</script>

<style>
.header-title{
    text-align: center;
}
.add-item{
float: right;
position: relative;
top: -70px;
left: -30px;

}
.nav-button{
  position: relative;
  top: -20px;
}
.menu-pos{
  position: fixed;
  cursor: pointer;
  margin: 20px 20px;
  font-size: 25px;
  z-index: 999;
  /*flex 不生效*/
}
.el-message-box__message p{
    word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  padding-left:50px;   
}
</style>