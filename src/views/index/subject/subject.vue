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
            <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增学科</el-button>
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
              <el-button
                type="text"
                size="small"
                @click="changeStatus(scope.$index, scope.row)"
              >{{ scope.row.status==0 ?"启用":"禁用" }}</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="page"
        :page-sizes="pSizes"
        :page-size="10"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>

      <!-- 新增学科的对话框 -->
      <el-dialog title="新增学科" :visible.sync="dialogVisible" width="570px" center>
        <!-- 对话框内表单 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="学科编号" prop="rid">
            <el-input v-model="ruleForm.rid"></el-input>
          </el-form-item>
          <el-form-item label="学科名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="学科简称" prop="short_name">
            <el-input v-model="ruleForm.short_name"></el-input>
          </el-form-item>
          <el-form-item label="学科简介" prop="intro">
            <el-input v-model="ruleForm.intro"></el-input>
          </el-form-item>
          <el-form-item label="学科备注" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer" center>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { subject } from "../../../api/api";

export default {
  name: "subject",
  // ----------------------------------  data  -----------------------------
  data() {
    return {
      pSizes: [5, 10, 15, 20],
      totalPage: 100,
      page: 1,
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
          // 示例数据
          rid: "qd001",
          name: "qdyidkf",
          short_name: "qianduan",
          creater: "王小虎",
          create_time: "2016-05-02",
          status: "启用"
        }
      ],

      // 对话框数据
      dialogVisible: false,
      ruleForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },

  // -----------------------------  methods  -----------------------------
  methods: {
    handleEdit(index, row) {
      window.console.log(index, row);
    },
    // 删除一行数据
    handleDelete(index, row) {
      window.console.log(index, row.id);

      this.$confirm("此操作将永久删除该学科, 确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          // 接口调用
          subject.remove({ id: row.id }).then(res => {
            this.$message.success(res.data.message);
            this.search();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 分页
    handleSizeChange(val) {
      // 控制每页多少条
      // 存到数据里发送请求时使用
      this.limit = val;

      // page和当前页是同一数据
      this.page = 1;
      this.search();
    },
    handleCurrentChange(val) {
      // 当前页是第几页
      // 存到数据里发送请求时使用
      this.page = val;
      subject.list({ page: val, limit: this.limit }).then(res => {
        this.tableData = res.data.data.items;
      });
    },

    // 搜索
    search() {
      subject
        .list({ page: this.page, limit: this.limit, ...this.formInline })
        .then(res => {
          this.tableData = res.data.data.items;
          // 总条数记得重新赋值
          this.totalPage = res.data.data.pagination.total;
        });
    },

    // 启用 禁用当前数据
    changeStatus(index, row) {
      subject
        .status({ id: row.id, status: row.status == 0 ? 1 : 0 })
        .then(res => {
          if (res.data.code == 200) {
            // 调用搜索方法刷新页面
            this.search();
          }
        });
    },

    // 新增学科
    add() {
      this.dialogVisible = false;
      subject
        .add({
          ...this.ruleForm
        })
        .then(res => {
          window.console.log(res);
        });
    },
    // 对话框事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 表单没问题的回调
        if (!valid) {
          // 表单数据有问题
          alert("检查一哈数据");
          return false;
        }
      });
    }
  },

  // -------------------------------  create钩子  ------------------------------
  created() {
    subject.list({ page: this.page, limit: this.limit }).then(res => {
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
.el-dialog {
  box-sizing: border-box;
  .el-dialog__header {
    background-color: rgb(6, 184, 250);
    .el-dialog__title {
      color: #fff;
    }
  }
}
</style>