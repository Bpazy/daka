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

    <el-table :data="formListDisplay" stripe style="width: 540px; display: inline-block;" v-loading="loading">
      <el-table-column prop="date" label="日期" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="180" align="center"></el-table-column>
      <el-table-column prop="distance" label="里程" width="180" align="center"></el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="text-align: center; margin-top: 20px;">
    </el-pagination>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'home',
  data() {
    return {
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      form: {
        name: '',
        distance: '',
        date: '2018-08-30',
      },
      formList: [],
      formListDisplay: [],
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
    }
  },
  async created() {
    this.load()
  },
  methods: {
    async confirm() {
      await this.$http.post('/save', {
        ...this.form,
        date: moment().format('YYYY-MM-DD'),
      })
      this.load()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.load()
    },
    async handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.load()
    },
    async load() {
      this.loading = true
      const pagination = (await this.$http.post('/list', {
        size: this.pageSize,
        start: (this.currentPage - 1) * this.pageSize,
      })).data
      this.formList = pagination.data
      this.total = pagination.total
      this.loading = false
    },
  },
  watch: {
    formList(newFormList) {
      this.formListDisplay = newFormList.map(form => ({
        ...form,
        distance: `${form.distance}米`,
      }))
    },
  },
}
</script>
<style scoped>

</style>
