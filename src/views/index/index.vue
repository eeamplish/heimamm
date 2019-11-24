<template>
  <!-- 整体布局容器 -->
  <el-container>
    <el-header>
      <div class="left">
        <i class="el-icon-s-fold" :class="{rotate:isCollapse}" @click="isCollapse = !isCollapse"></i>
        <img src="../../assets/login_logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img
          :src="usericon"
          alt
        />
        <span>{{ username }},您好</span>
        <el-button size="mini" type="primary" @click="open">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <!-- 设置完右边会随着折叠改变宽度 -->
        <el-menu default-active="5" router class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item index="/index/date">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/problems">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getToken,removeToken } from "../../utils/token";
import {userInfo} from '../../api/api'

export default {
  name: "index",

  data() {
    return {
      isCollapse: false,
      username:"",
      usericon:"",
    };
  },
  methods: {
     open() {
        this.$confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeToken();
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          this.$router.push("/login");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '爱你哟！'
          });          
        });
      }
  },
  beforeCreate() {
    const token = getToken();
    if (!token) {
      this.$message.error("请先登录");
      this.$router.push("/login");
    } else {
      userInfo().then(res=>{
        window.console.log(res);
        this.username = res.data.data.name;
        this.usericon = res.data.data.avatar;
      });
    }
  }
};
</script>

<style lang="less">
.el-container {
  height: 100%;

  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-icon-s-fold {
        font-size: 28px;
        margin-right: 18px;
      }
      img {
        width: 33px;
        height: 28px;
      }
      span {
        width: 92px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
        margin-left: 11px;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }

      span {
        font-size: 14px;
      }
      .el-button {
        margin-left: 38px;
      }
    }
  }
  .el-aside {
    background-color: #fff;
    color: #333;
    height: 100%;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    height: 100%;
    width: 100%;
  }

  .el-icon-s-fold {
    font-size: 40px;
    transition: 0.5s;
  }
  .rotate {
    transform: rotate(-90deg);
  }
}
</style>