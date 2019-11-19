<template>
  <div class="login-container">
    <div class="from-wrapper">
      <div class="top">
        <span class="logo"></span>
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub_title">用户登录</span>
      </div>
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
    background:rgba(245,245,245,1);
    padding: 44px 41px 0 43px;

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
  }

  .bg {
    width: 633px;
    height: 435px;
  }
}
</style>