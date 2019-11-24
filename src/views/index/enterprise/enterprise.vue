<template>
  <div>
    <header>
      <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="企业编号">
            <el-input v-model="formInline.user" class="col1"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="formInline.user" class="col2"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="formInline.user" class="col1"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="请选择状态" class="col2">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit">清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="onSubmit">新增企业</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </header>
    <div class="main">
      <el-card>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column label="企业编号" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.num }}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.subName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属领域" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.domain }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建者" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="130">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small">禁用</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-pagination
        background
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="20"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "subject",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          num: "qd001",
          subName: "qdyidkf",
          domain: "qianduan",
          name: "王小虎",
          date: "2016-05-02",
          state: "启用"
        },

        {
          num: "qd00",
          subName: "qdyidkf",
          domain: "qianduan",
          name: "王果他",
          date: "2017-05-02",
          state: "启用"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      alert("submit!");
    },
    handleEdit(index, row) {
      window.console.log(index, row);
    },
    handleDelete(index, row) {
      window.console.log(index, row);
    }
  }
};
</script>

<style lang="less">
.el-form--inline {
  .col1 {
    width: 100px;
  }

  .col2 {
    width: 130px;
  }
}
.main {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 30px;
}
</style>