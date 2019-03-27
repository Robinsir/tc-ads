<template>
    <div class="variable-list">
        <el-table
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="name"
          label="变量名"
          width="120">
        </el-table-column>
        <el-table-column
          property="read"
          label="读取值"
          width="120">
        </el-table-column>
        <el-table-column
          property="write" 
          label="写入值">
        </el-table-column>
        <el-table-column
          property="option" 
          label="操作">
          <el-button>写入</el-button>
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  name: 'varialbe-itmes'
}
</script>

<style>
.variable-list{
    width: 100%;
    height: 400px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
