<template>
  <div class="login-container">
    <div class="from-wrapper">
      <div class="top">
        <span class="logo"></span>
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub_title">用户登录</span>
      </div>
      <el-row class="row">
        <el-col :span="24" class="col">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="input2"></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="24" class="col">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input2"></el-input>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="18" class="col">
          <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="input2"></el-input>
        </el-col>
        <el-col :span="6" class="col">
          <img src="../../assets/captcha.png" alt />
        </el-col>
      </el-row>
      <!-- 协议 条款 -->
      <div class="private">
        <el-checkbox v-model="checked"></el-checkbox>
        <p class="agree">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </p>
      </div>
      <el-button type="primary">登录</el-button>
      <el-button type="primary">注册</el-button>
    </div>
    <img src="../../assets/login_bg.png" alt class="bg" />
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="less">
.login-container {
  box-sizing: border-box;
  height: 100%;
  width: 1400px;

  padding: 73px;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-between;

  .from-wrapper {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 44px 41px 0 43px;
    box-sizing: border-box;
    .top {
      display: flex;
      align-items: center;
      .logo {
        width: 22px;
        height: 17px;
        margin-right: 16px;
        background: url("../../assets/login_logo.png") no-repeat center;
      }
      .title {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        margin-right: 14px;
        color: rgba(12, 12, 12, 1);
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .sub_title {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .el-input__inner {
      height: 44px;
    }
    .row {
      margin-top: 30px;
    }

    img {
      height: 44px;
      width: 100%;
    }

  // 协议 条款
    .private {
      display: flex;
      align-items: center;
      margin-top: 30px;

      .agree {
        margin-left: 7px;
        display: flex;
        font-size: 14px;
        align-items: center;
        .el-link--inner {
          font-size: 14px;
        }
      }
    }

    // 两个按钮
    .el-button.el-button--primary {
      width: 394px;
      height: 40px;
      font-size: 16px;
      display: block;
      margin-left: 0;
      margin-top: 30px;
    }
  }

  .bg {
    width: 633px;
    height: 435px;
  }
}
</style>