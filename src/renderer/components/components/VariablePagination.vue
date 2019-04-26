<template>
    <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 150, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.length"
        >
        </el-pagination>
    </div>
</template>
<script>
  export default {
    props: {
      data: Array
    },
    data () {
      return {
        pageSize: 50,
        currentPage: 1
      }
    },
    methods: {
      handleSizeChange (val) {
        this.pageSize = val
        this.handleCurrentChange(this.currentPage)
      },
      handleCurrentChange (val) {
        let pageArray = this.data.slice((val - 1) * this.pageSize, val * this.pageSize)
        console.log('TCL: handleCurrentChange -> this.pageSize', this.data)
        this.$emit('current', pageArray)
        console.log(`当前页: ${val}`, `当前数组:${pageArray}`)
      }
    },
    watch: {
      data () {
        this.handleCurrentChange(this.currentPage)
      }
    }
  }
</script>
<style>
.block{
    margin-top:20px ; 
    float: right;
}
</style>