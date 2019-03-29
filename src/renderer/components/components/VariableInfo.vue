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
                v-for="(value,key,index) in options"
                :key="index"
                :label="key"
                :value="key">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="comment">
            <el-input class="input-box" v-model.number="readInfo.comment"></el-input>
        </el-form-item>
        <div class="sub-button">
            <el-button @click="onReset()">清空</el-button>
            <el-button type="primary" @click="onAddOne">添加</el-button>
        </div>
        </el-form>
    </el-dialog>
</template>

<script>
import * as conf from '@/conf'
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
  mounted () {
    this.options = conf.TYPE_LENGTH
  },
  methods: {
    onReset () {
      this.readInfo = {
        name: '',
        type: '',
        comment: '',
        size: 0
      }
    },
    onAddOne () {
      this.readInfo.size = this.options[this.readInfo.type]
      this.$emit('add', this.readInfo)
      console.log(this.readInfo)
    }

  },
  data () {
    return {
      readInfo: {
        name: '',
        type: '',
        size: 0
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