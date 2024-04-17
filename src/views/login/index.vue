<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <center>
        <h1>飞机结构与系统(CFM56发动机)<br/>虚拟仿真教学平台</h1>
        <h3 class="title">用户登录</h3>
        </center>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <span>
          用户名
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <span>
          密码
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
      <div class="tips">
        <!-- <el-link type="primary" @click="openRegisterForm">注册成为新用户</el-link>
        <el-link type="warning" style="float: right;" @click="openForgetForm">忘记密码</el-link> -->
        <span style="margin-right:20px;">用户名: demo</span>
        <span> 密码: 123456</span>
        <span><el-link type="primary" href="https://github.com/MercuryEdge/aircraft-main" target="_blank">项目链接</el-link></span>
        
      </div>
    </el-form>
    <!-- 用户信息编辑对话框 -->
    <el-dialog :title="title" :visible.sync="dialogRegFormVisible" @closed="clearForm">
      <el-form ref="userFormRef" :model="userForm" :rules="rules">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="userForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="userForm.password" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRegFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </div>

    </el-dialog>
    <!-- 用户忘记密码对话框 -->
    <el-dialog title="申请重置密码" :visible.sync="dialogFgtFormVisible" @closed="clearForm">
      <el-steps :active="1" style="margin-left: 36px;margin-right: 42px;margin-bottom: 30px;">
        <el-step title="提交审核" description="提交用户信息后请尽快联系管理员审核" />
        <el-step title="管理员审核" description="管理员确认用户信息重置密码" />
        <el-step title="重置密码" description="密码重置设置新密码" />
      </el-steps>
      <el-form ref="userFgtFormRef" :model="userFgtForm" :rules="rules">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="userFgtForm.username" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFgtFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="forgetUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import userApi from '@/api/userManage'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不得少于6位字符'))
      } else {
        callback()
      }
    }
    return {
      basePath: process.env.VUE_APP_BASE_API,
      imageUrl: '',
      title: '注册成为新用户',
      formLabelWidth: '100px',
      userForm: {},
      userFgtForm: {},
      loginForm: {},
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录初始密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogRegFormVisible: false,
      dialogFgtFormVisible: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push('/')
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    clearForm() {
      this.userForm = {}
      this.$refs.userFormRef.clearValidate()
      this.$refs.userFgtFormRef.clearValidate()
    },
    saveUser() {
      // 触发表单验证
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          // 提交请求给后端
          userApi.saveUser(this.userForm).then(response => {
            // 成功提示
            this.$message({
              message: response.message,
              type: 'success'
            })
            // 关闭对话框
            this.dialogRegFormVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    forgetUser() {
      // 触发表单验证
      this.$refs.userFgtFormRef.validate((valid) => {
        if (valid) {
          // 提交请求给后端
          userApi.forgetUser(this.userFgtForm).then(response => {
            // 成功提示
            this.$message({
              message: response.message,
              type: 'success'
            })
            // 关闭对话框
            this.dialogFgtFormVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openRegisterForm() {
      this.dialogRegFormVisible = true
    },
    openForgetForm() {
      this.dialogFgtFormVisible = true
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #464646;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }

}
</style>

<style lang="scss" scoped>
$bg: #0960bc;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background-image: url(../../assets/bg/1.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;

  h1 {
    color: #ffffff;
    text-shadow: 0 0 10px rgb(180, 180, 180);
    font-size: 22pt;

  }

  span {
    color: #ffffff;
    text-shadow: 0 0 10px rgb(180, 180, 180);
  }
}

.login-form {
  position: relative;
  width: 650px;
  max-width: 100%;
  padding: 20px 35px 0;
  margin: 0 auto;
  overflow: hidden;
  // background-color: #626262;
  // box-shadow: 0 0 10px rgb(180, 180, 180);
  border-radius: 14px;
  opacity: 0.8;
}

.tips {
  font-size: 14px;
  color: #e3e3e3;
  margin-bottom: 10px;

  span {
    &:first-of-type {
      margin-right: 16px;
    }
  }
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: #ffffff;
    text-shadow: 0 0 10px rgb(180, 180, 180);
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}

.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}

.el-dialog {
  .el-input {
    width: 85%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
