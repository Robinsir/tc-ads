<template>
    <div class="variable-list">
        <el-table
        highlight-current-row
        :data="listTable">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="name"
          label="变量名"
          align="center"
          >
        </el-table-column>
        <el-table-column
          property="type"
          label="类型"
          align="center"
        >
        </el-table-column>
        <el-table-column
          property="comment"
          label="注释"
          align="center"
        >
        </el-table-column>
        <el-table-column
          property="read"
          label="读取值"
          align="center"
        >
        </el-table-column>
        <el-table-column
           align="center"
          property="write" 
          label="写入值">
          <el-input size="mini" type="text" class="write-value"></el-input>
        </el-table-column>
        <el-table-column
          align="center"
          property="option" 
          label="操作">
          <template slot-scope="scope">
            <div>
            <a class="option write">写入</a>
            <a class="option delete" size='mini' @click="onDeleteItem(scope.$index)">删除</a>
            </div>
          </template>
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  name: 'varialbe-itmes',
  props: {
    lists: Array
  },
  computed: {
    listTable () {
      return this.lists
    }
  },
  methods: {
    onDeleteItem (item) {
      console.log(item)
      this.listTable.splice(item, 1)
    }
  }

}
</script>

<style>
.variable-list{
    width: 100%;
    /* height: 100%; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.option{
  cursor: pointer;
  text-decoration: underline;

}
.write{
  color:#409eff;
  padding-left: -10px;
}
.delete{
  padding-left: 10px;
  color:#f56c6c;
}
.el-table_1_column_7 .cell{
  display: flex;
  align-content: space-between;
}
body .write-value {
   width: 60%
 }
</style>
