<template>
    <div>
        <h1>设置</h1>
        <div class="sub-button test">
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="onCancel"></el-button>
            <el-button type="success" icon="el-icon-check" size="mini" circle @click="onSucceed"></el-button>
        </div>

        <el-form :model="connectInfo" status-icon>

        <el-form-item label="Host:" prop="name">
            <el-input size='mini' class="input-box" type="text" v-model="connectInfo.host" autocomplete="off">
            </el-input>
        </el-form-item>

        <el-form-item label="AMS Target:" prop="name">
            <el-input size='mini' class="input-box" type="text" v-model="connectInfo.amsNetIdTarget" autocomplete="off">
            </el-input>
        </el-form-item>

        <el-form-item label="AMS Target Port:" prop="type">
            <el-input size='mini' class="input-box" type="text" v-model.number="connectInfo.amsPortTarget" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="AMS Source:" prop="type">
            <el-input size='mini' class="input-box" type="text" v-model="connectInfo.amsNetIdSource" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="AMS Source Port:" prop="type">
            <el-input size='mini' class="input-box" type="text" v-model.number="connectInfo.amsPortSource" autocomplete="off"></el-input>
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
    ops: Object
  },
  computed: {
    connectInfo () {
      return this.ops
    }
  },
  methods: {
    onSucceed () {
      this.$emit('set', this.connectInfo)
    },
    onCancel () {
      this.$emit('cancel')
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