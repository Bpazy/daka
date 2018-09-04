<template>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
        <span>{{content}}</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Dialog',
  data() {
    return {
      dialogVisible: false,
      content: '',
    };
  },
  beforeCreate() {
    Object.defineProperty(Vue.prototype, '$dialog', {
      value: this,
      readable: true,
      writable: false,
    });
  },
  methods: {
    open(content) {
      this.dialogVisible = true;
      this.content = content;
    },
    cancel() {
      this.dialogVisible = false;
    },
    confirm() {
      this.dialogVisible = false;
    },
  },
};
</script>
