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
          label="读取值"
          align="center"
        >
        <template slot-scope="scope">
          {{scope.row.value}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="写入值">
          <!-- <el-input size="mini" class="write-value" v-model="test2" >
          </el-input> -->
          <template slot-scope="scope">
          <el-input size="mini" class="write-value" v-model.number="scope.row.write" @change="onChange">
          </el-input>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="option" 
          label="操作">
          <template slot-scope="scope">
            <div>
            <a class="option write" @click="onWriteValue(scope.row)">写入</a>
            <a class="option delete" size='mini' @click="onDeleteItem(scope.$index)">删除</a>
            </div>
          </template>
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {ipcRenderer} from 'electron'
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
      this.listTable.splice(item, 1)
      this.onChange()
    },
    onChange () {
      this.$emit('change', this.listTable)
    },
    onWriteValue (item) {
      ipcRenderer.send()
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
