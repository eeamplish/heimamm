<template>
  <div class="login-container">
    <div class="from-wrapper">
      <div class="top">
        <span class="logo"></span>
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub_title">用户登录</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row class="row">
          <el-col :span="24" class="col">
            <el-form-item prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="row">
          <el-col :span="24" class="col">
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="row">
          <el-col :span="18" class="col">
            <el-form-item prop="rcode">
              <el-input v-model="ruleForm.rcode" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="col">
            <img :src="rcode" @click="changeCode" />
          </el-col>
        </el-row>
      </el-form>

      <!-- 协议 条款 -->
      <div class="private">
        <el-checkbox v-model="checked"></el-checkbox>
        <p class="agree">
          我已阅读并同意
          <el-link type="primary">用户协议</el-link>和
          <el-link type="primary">隐私条款</el-link>
        </p>
      </div>

      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <el-button type="primary" @click="dialogVisible = true">注册</el-button>
    </div>
    <img src="../../assets/login_bg.png" alt class="bg" />

    <el-dialog
      title="用户注册"
      :visible.sync="dialogVisible"
      width="600px"
      height="780px"
      :before-close="false"
      :top="3"
    >
      <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" prop="icon">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.code" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img class="captcha" :src="code" @click="changeCaptcha" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="registerForm.rcode"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button class="getCode" @click="sendCode">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const checkPhone = function(rule, value, callback) {
  if (!value.trim()) {
    callback(new Error("手机号不能为空"));
  } else {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的手机号"));
    }
  }
};

import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      rcode: "http://183.237.67.218:3002/captcha?type=login",
      dialogVisible: false,
      imageUrl: "",
      code: "http://183.237.67.218:3002/captcha?type=sendsms",
      checked: true,
      ruleForm: {
        phone: "",
        password: "",
        rcode: ""
      },
      registerForm: {
        name: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: ""
      },
      rules: {
        phone: [
          // 输入框为空的提示
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // 对应规则的提示
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 2, max: 6, message: "密码为2-6位", trigger: "blur" }
        ],
        rcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码为4位", trigger: "blur" }
        ],
        icon: [{ required: true }],
        name: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 2, max: 6, message: "昵称为2-6位", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
          // {  message: '请输入正确的邮箱', trigger: 'blur' },
          // 正则验证
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码为4位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      window.console.log(this.checked);
      this.$refs[formName].validate(valid => {
        if (this.checked) {
          if (valid) {
            axios({
              url: "http://183.237.67.218:3002/login",
              method: "post",
              // 跨域请求时,默认不带cookie 导致验证码无法验证
              // 为了携带cookie 加下面这行代码
              withCredentials: true,
              data: {
                phone: this.ruleForm.phone,
                password: this.ruleForm.password,
                code: this.ruleForm.rcode
              }
            }).then(res => {
              //成功回调
              this.$message(res.data.message);
            });
          } else {
            this.$message.warning("请输入正确的数据");
            return false;
          }
        } else {
          this.$message.warning("请同意协议");
        }
      });
    },
    changeCode() {
      this.rcode = `http://183.237.67.218:3002/captcha?type=login&${Date.now()}`;
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    changeCaptcha() {
      this.code = `http://183.237.67.218:3002/captcha?type=sendsms${Date.now()}`;
    },
    sendCode() {
      axios({
        url: "http://183.237.67.218:3002/sendsms",
        method: "post",
        withCredentials: true,
        data: {
          code: this.registerForm.code,
          phone: this.registerForm.phone
        }
      }).then(res => {
        //成功回调
        window.console.log(res);
      });
    }
  }
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
    .el-form-item {
      margin-bottom: 0;
    }

    .el-form-item__content {
      margin-left: 0 !important;
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