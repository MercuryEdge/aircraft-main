<template>
  <div>
    <el-card>
      <h2>结构系统</h2>
      <img class="card-img-point" :src="baseUrl + '/covers/' + 'unity.png'">
      <el-link :underline="false" :href="serverUrl" target="_blank" style="margin-bottom: 20px;margin-top: 20px;"><el-button type="primary" round style="width: 200px;">开始学习</el-button></el-link>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serverUrl: 'http://172.20.10.5:100/caucd/bjsb', // 虚拟机IP+文件地址
      baseUrl: process.env.VUE_APP_BASE_API
    }
  }
}
</script>

<style>
.card-img-point {
  height: 100%;
}

</style>
