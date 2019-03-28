<template>
    <div>
        <h1>设置</h1>
        <div class="sub-button test">
            <!-- <el-button @click="onReset()">清空</el-button> -->
            <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" circle></el-button>
            
            <!-- <el-button type="primary">添加</el-button> -->
        </div>
        <el-form :model="connectInfo" status-icon>
        <el-form-item label="TargetAMS:" prop="name">
            <el-input size='mini' class="input-box" type="text" v-model="connectInfo.targetAMS" autocomplete="off">

            </el-input>
        </el-form-item>

        <el-form-item label="TargetAMS Port:" prop="type">
            <el-input size='mini' class="input-box" type="text" v-model.number="connectInfo.targetAMSPort" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="SourceAMS:" prop="type">
            <el-input size='mini' class="input-box" type="text" v-model="connectInfo.sourceAMS" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="SourceAMS Port:" prop="type">
            <el-input size='mini' class="input-box" type="text" v-model.number="connectInfo.sourceAMSPort" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Port:" prop="type">
            <el-input size='mini' class="input-box" type="text" v-model.number="connectInfo.port" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="timeout:" prop="prop">
            <el-input size='mini' class="input-box" v-model.number="connectInfo.timeout"></el-input>
        </el-form-item>

        </el-form>
    </div>
</template>

<script >
export default {
  props: {
    addOne: false
  },
  computed: {
    addOneShow: {
      get () {
        return this.addOne
      },
      set (val) {
        this.$emit('close', val)
      }

    }
  },
  methods: {
    onReset () {
      this.readInfo = {
        name: '',
        type: '',
        prop: ''
      }
    }
  },
  data () {
    return {
      connectInfo: {
        targetAMS: '',
        sourceAMS: '',
        targetAMSPort: 0,
        sourceAMSPort: 0,
        port: 0,
        timeout: 0
      },
      options: []
    }
  }

}
</script>

<style scoped>
body .input-box{
    /* width: 70%; */
    display: block;
}  

/* .el-form-item__label{
    width: 20%;
} */
.sub-button{
    display: flex;
    justify-content: space-around;
}

/deep/ .el-form>.el-form-item{
    margin-bottom: 0px;
}
</style>