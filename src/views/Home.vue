<template>
  <div class="home">
    <div>
      <span>名称: </span>
      <el-input title="name" placeholder="请输入名称" v-model="name"></el-input>
    </div>
    <div>
      <span>里程: </span>
      <el-input title="distance" placeholder="请输入里程" v-model="distance"></el-input>
    </div>
    <el-button type="primary" @click="confirm">确认</el-button>

    <div v-for="item in list" :key="item.name">
      <span>{{item.name}}</span>
      <span>{{item.distance}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        name: '',
        distance: '',
        list: [],
      }
    },
    methods: {
      confirm() {
        this.list.push({
          name: this.name,
          distance: this.distance,
        })
        this.clear()
      },
      clear() {
        this.name = ''
        this.distance = ''
      },
    },
  };
</script>
