<template>
  <div class="home">
    <el-form :inline="true" :model="form" :rules="rules">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="里程" prop="distance">
        <el-input v-model.number="form.distance" placeholder="请输入里程">
          <template slot="append">米</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirm">确认</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="formList" stripe style="width: 540px">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="distance" label="里程" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      form: {
        name: '',
        distance: '',
        date: '2018-08-30',
      },
      formList: [],
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        distance: [
          { required: true, message: '请输入里程', trigger: 'blur' },
          {
            type: 'number',
            required: true,
            message: '请输入数字',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    confirm() {
      this.formList.push({
        ...this.form,
        distance: `${this.form.distance}米`,
      });
    },
  },
};
</script>
<style scoped>
</style>
