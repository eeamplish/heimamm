<template>
  <div class="login-container">
    <div class="from-wrapper"></div>
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
  // 宽度最后改成1400px
  width: 100%;
  
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
    background-color: #fff;
  }

  .bg {
    width: 633px;
    height: 435px;
  }
}
</style>