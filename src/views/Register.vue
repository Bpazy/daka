<template>
    <el-form :model="registerForm" label-width="90px" :rules="rules" ref="registerForm" style="display: inline-block;">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="registerForm.pass" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="registerForm.checkPass" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 5,
            max: 50,
            message: '长度在 5 到 50 个字符',
            trigger: 'blur',
          },
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code, msg } = (await this.$http.post('/register', {
            username: this.registerForm.username,
            password: this.registerForm.pass,
          })).data
          if (code !== 'OK') {
            this.$message.error(msg)
            return true
          }
          if (code === 'OK') {
            this.$message({ message: msg, type: 'success' })
            this.$router.push('/login')
            return true
          }
        }
        return false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
