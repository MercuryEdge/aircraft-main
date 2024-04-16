<template>
  <div>
    <el-card>
      <el-form ref="userFormRef" :model="userForm" :rules="rules">
        <h2 style="margin-left: 40px;">用户信息</h2>
        <!-- <el-form-item label="用户ID" prop="id" :label-width="formLabelWidth">
                <el-input v-model="userForm.id" autocomplete="off" disabled="true"></el-input>
            </el-form-item> -->
        <el-form-item label="用户ID" prop="id" :label-width="formLabelWidth">
          {{ userForm.id }}
        </el-form-item>
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          {{ userForm.username }}
        </el-form-item>
        <el-form-item label="新密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="userForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth" prop="statue">
          <el-tag v-if="userForm.statue == 1" effect="plain" type="success">标准版</el-tag>
          <el-tag v-else-if="userForm.statue == 2" effect="plain">专业版</el-tag>
          <el-tag v-else-if="userForm.statue == 3" effect="plain" type="warning">管理员</el-tag>
          <el-tag v-else effect="plain" type="danger">待重置</el-tag>
        </el-form-item>
      </el-form>
      <el-button
        style="float:right;margin-bottom: 20px;width: 200px;"
        type="primary"
        icon="el-icon-delete"
        @click="resetUserPassword"
      >修改密码</el-button>
    </el-card>

  </div>
</template>

<script>
import { logout } from '@/api/user'
import userApi from '@/api/userManage'
import { removeToken } from '@/utils/auth'
export default {
  data() {
    return {
      basePath: process.env.VUE_APP_BASE_API,
      formLabelWidth: '100px',
      userForm: {},
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserById(this.$store.state.user.id)
  },
  methods: {
    getUserById(id) {
      userApi.getUserById(id).then(response => {
        this.userForm = response.data
        this.userForm.password = ''
      })
    },
    resetUserPassword() {
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          userApi.resetUserPassword(this.userForm)
          this.$message({
            message: '修改密码成功请重新登录',
            type: 'success'
          })
          logout().then(() => {
            console.log('logout')
            removeToken()
            this.$router.push(`/login`)
          }).catch(() => {
            console.log('logout Failed')
          })
        }
      })
    }
  }
}

</script>

<style></style>
