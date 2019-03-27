<template>
    <div>
    <el-container>
        <el-header><h1 class="header-title">ADS测试工具</h1></el-header>
        <el-main>
          <div class="nav-button">
              <el-button size="small" type="primary">通讯测试</el-button>
              <el-button size="small" type="warning" >断开连接</el-button>
              <el-button size="small" type="info" >设置</el-button>
          </div>
            <variable-items></variable-items>
            <el-button  class="add-item" type="primary" icon="el-icon-plus" circle @click="onAddOne"></el-button>
            <variable-info :addOne="showAdd" @close='onAddOneClose'></variable-info>   
        </el-main>
    </el-container>
</div>
</template>

<script>
import VariableItems from './components/VariableItems'
import VariableInfo from './components/VariableInfo'
export default {
  data () {
    return {
      showAdd: false
    }
  },
  components: {
    VariableItems,
    VariableInfo
  },
  methods: {
    onAddOne () {
      this.showAdd = true
    },
    onAddOneClose (val) {
      this.showAdd = false
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
</style>