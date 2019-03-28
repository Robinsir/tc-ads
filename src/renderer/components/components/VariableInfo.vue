<template>
    <el-dialog
    title="添加一个变量"
    :visible.sync="addOneShow"
    width="80%">
        <el-form :model="readInfo" status-icon>

        <el-form-item label="变量名:" prop="name">
            <el-input class="input-box" type="text" v-model="readInfo.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="数据类型:" prop="type">
            <el-select class="input-box" v-model="readInfo.type" filterable placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="属性名:" prop="prop">
            <el-input class="input-box" v-model.number="readInfo.prop"></el-input>
        </el-form-item>
        <div class="sub-button">
            <el-button @click="onReset()">清空</el-button>
            <el-button type="primary">添加</el-button>
        </div>
        </el-form>
    </el-dialog>
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
      readInfo: {
        name: '',
        type: '',
        prop: ''
      },
      options: []
    }
  }

}
</script>

<style scoped>
body .input-box{
    width: 70%;
}  

/deep/ .el-form-item__label{
    width: 20%;
}

.sub-button{
    display: flex;
    justify-content:space-around;
}
</style>