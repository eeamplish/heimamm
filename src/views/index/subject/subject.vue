<template>
  <div>
    <header>
      <el-card class="box-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="学科编号">
            <el-input v-model="formInline.rid" class="col1"></el-input>
          </el-form-item>
          <el-form-item label="学科名称">
            <el-input v-model="formInline.name" class="col2"></el-input>
          </el-form-item>
          <el-form-item label="创建者">
            <el-input v-model="formInline.creater" class="col1"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="请选择状态" class="col2">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button>清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus">新增学科</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </header>
    <div class="main">
      <el-card>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column label="学科编号" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.rid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="学科名称" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="简称" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.short_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建者" width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.creater }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建日期" width="130">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="130">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0" style="margin-left: 10px">禁用</span>
              <span v-else-if="scope.row.status==1" style="margin-left: 10px">启用</span>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="1"
        :page-sizes="pSizes"
        :page-size="10"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { subject } from "../../../api/api";

export default {
  name: "subject",
  data() {
    return {
      pSizes: [5, 10, 15, 20],
      totalPage: 100,
      page: "",
      limit: "10",

      formInline: {
        // 不加也行，搜索时会自动创建
        // name: "",
        // rid: "",
        // creater: "",
        // status: ""
      },
      tableData: [
        {
          // 示例
          rid: "qd001",
          name: "qdyidkf",
          short_name: "qianduan",
          creater: "王小虎",
          create_time: "2016-05-02",
          status: "启用"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      window.console.log(index, row);
    },
    handleDelete(index, row) {
      window.console.log(index, row);
    },

    // 分页
    handleSizeChange(val) {
      // 控制每页多少条
      // 存到数据里发送请求时使用
      this.limit = val;
      subject.list({page:this.page, limit: val }).then(res => {
        this.tableData = res.data.data.items;
      });
    },
    handleCurrentChange(val) {
      // 当前页是第几页
      // 存到数据里发送请求时使用
      this.page = val;
      subject.list({ page: val,limit: this.limit }).then(res => {
        this.tableData = res.data.data.items;
      });
    },

    // 搜索
    search() {
      subject
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then(res => {
          this.tableData = res.data.data.items;
        });
    }
  },
  created() {
    subject.list({ page: this.page, limit: this.limit }).then(res => {
      window.console.log(res);
      this.totalPage = res.data.data.pagination.total;
      this.tableData = res.data.data.items;
    });
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