<template>
    <el-container v-bind:style="{height:windowHeight+'px'}">
      <el-aside :width="asideWidth" class="aside-menu">
        <connet-setting @set="onSetOption" @cancel="onMenu" :ops="connetOptions">
        </connet-setting>
      </el-aside>
      <el-container>
        <i class="el-icon-menu menu-pos" @click="onMenu"></i>
          <el-header>
            <h1 class="header-title">ADS测试工具</h1>

            </el-header>
          <el-main>
              <div class="nav-button">
                <el-button size="small" type="primary" @click="onTestAds">通讯测试</el-button>
                <el-button size="small" type="warning" >开启监听</el-button>
                <el-button size="small" @click="onGetSymbolList">获取SYMBOL列表</el-button>
                <el-button size="small" type="danger" >全部写入</el-button>
              </div>
              <variable-items :lists="variableLists"></variable-items>
              <el-button  class="add-item" type="primary" icon="el-icon-plus" circle @click="onAddOne"></el-button>
              <variable-info :addOne="showAdd" @close='onAddOneClose'></variable-info>   
          </el-main>
      </el-container>
    </el-container>
</template>

<script>
import {ipcRenderer} from 'electron'
import * as ipc from '@/../ipc'
import * as conf from '@/conf'
import VariableItems from './components/VariableItems'
import VariableInfo from './components/VariableInfo'
import ConnetSetting from './components/ConnetSetting'
export default {
  data () {
    return {
      showAdd: false,
      asideWidth: '0',
      connetOptions: {},
      variableLists: [],
      windowHeight: 0
    }
  },
  components: {
    VariableItems,
    VariableInfo,
    ConnetSetting

  },
  created () {
    this.windowHeight = document.documentElement.clientHeight - 20
    window.onresize = () => {
      this.windowHeight = document.documentElement.clientHeight - 20
    }

    ipcRenderer.on(ipc.TEST, (event, arg) => {
      let strArg = ''
      for (let item in arg) {
        strArg = strArg + '>' + item + ':' + arg[item] + ' <br />'
      }
      this.$alert(strArg, '通讯测试结果', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true
      }).catch(_ => {})
    })

    ipcRenderer.on(ipc.GET_SYMBOL_LIST, (event, arg) => {
      this.variableLists = arg
      console.log(arg)
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
        const options = window.localStorage.getItem(conf.CONNECT_OPTIONS)
        this.connetOptions = JSON.parse(options)
        console.log(options)
      } else {
        this.asideWidth = '0'
      }
    },
    onTestAds (options) {
      console.log('connecting', options)
      if (options.port === undefined) {
        options = window.localStorage.getItem(conf.CONNECT_OPTIONS)
        options = JSON.parse(options)
      }
      ipcRenderer.send(ipc.TEST, options)
    },
    onSetOption (options) {
      this.onTestAds(options)
      window.localStorage.setItem(conf.CONNECT_OPTIONS, JSON.stringify(options))
    },
    onGetSymbolList () {
      const options = window.localStorage.getItem(conf.CONNECT_OPTIONS)
      this.connetOptions = JSON.parse(options)
      ipcRenderer.send(ipc.GET_SYMBOL_LIST, this.connetOptions)
    }
  }

}
</script>

<style>
.header-title{
    text-align: center;
}
.add-item{
position: fixed;
right: 10%;
bottom: 10%;

}
body,#app,.el-container,.el-main{
  height: 100%;
}
.nav-button{
  display: flex;
  justify-content:space-around;
  padding-bottom: 10px;
  z-index: 999;
  width: 100%;
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
body .aside-menu{
  height: 100%;
  overflow-y: scroll;
}
</style>