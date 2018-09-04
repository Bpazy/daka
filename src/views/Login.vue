<template>
    <el-form :model="loginForm" label-width="90px" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.loginForm.checkPass !== '') {
          this.$refs.loginForm.validateField('checkPass');
        }
        callback();
      }
    }
    return {
      loginForm: {
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
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/login', {
            username: this.loginForm.username,
            password: this.loginForm.pass,
          });
        }
        return false;
      });
    },
  },
};
</script>
