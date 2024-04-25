<template>
  <div>
    <!-- <h2>系统原理</h2>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <img class="card-img-point" :src="baseUrl + '/covers/' + '0c64c5c1-f270-4b88-bab5-1f0e1e5f18c5.png'"/>
          <h2>CFM-5B 发动机构造</h2>
          <el-link :underline="false" href="http://172.20.10.5/op/view.aspx?src=%5C%5CWIN-6F1F6AM4VTK%5Cppt%5C2.pptx" target="_blank"><el-button type="primary" round>开始学习</el-button></el-link>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <img class="card-img-point" :src="baseUrl + '/covers/' + '4303181b-3f4a-476e-8c58-1543145a0fe9.png'"/>
              <h2>飞机起落架系统概述</h2>
          <el-link :underline="false" href="http://172.20.10.5/op/view.aspx?src=%5C%5CWIN-6F1F6AM4VTK%5Cppt%5C2.pptx" target="_blank"><el-button type="primary" round>开始学习</el-button></el-link>
        </el-card>
      </el-col>
    </el-row> -->
    <el-card>
      <el-row>
        <el-col :span="6">
          <h2>系统原理</h2>
        </el-col>
        <el-col :span="18" align="right">
          <el-pagination
            :current-page="searchModelPPT.pageNo"
            :page-size="6"
            layout="prev, pager, next"
            :total="totalPPT"
            @current-change="handleCurrentChangePPT"
          />
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col v-for="file in fileListPPT" :key="file.id" :span="12">
          <el-card class="card-file-ppt" :body-style="{ padding: '0' }">
            <img
              class="card-img-ppt"
              :src="baseUrl + '/covers/' + file.filecover"
              @click="exl(serverUrl + shareUrl)"
            >
            <!-- @click="exl(serverUrl + shareUrl + file.fileuuid)" -->
            <div style="text-align: center;" @click="exl(serverUrl + shareUrl + file.fileuuid)">
              <div class="fileNameDiv">
                <h3>{{ file.filename }}</h3>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import fileApi from '@/api/fileManage'

export default {
  data() {
    return {
      serverUrl: 'https://view.officeapps.live.com/op/view.aspx?src=', // 虚拟机的IP地址
      shareUrl: 'http%3a%2f%2fvideo.ch9.ms%2fbuild%2f2011%2fslides%2fTOOL-532T_Sutter.pptx', // 虚拟机中存放PPT文件夹的网络路径
      baseUrl: process.env.VUE_APP_BASE_API,
      totalPPT: 0,
      searchModelPPT: {
        filetype: 0,
        pageNo: 1,
        pageSize: 6
      }
    }
  },
  created() {
    this.getFileList(5)
  },
  methods: {
    handleCurrentChangePPT(pageNo) {
      this.show = false
      this.searchModelPPT.pageNo = pageNo
      this.getFileList(5)
      this.show = true
    },
    getFileList(type) {
      switch (type) {
        case 5: fileApi.getFileListByType(5, this.searchModelPPT).then(response => {
          this.fileListPPT = response.data.rows
          this.totalPPT = response.data.total
        }); break
      }
    },
    exl(path) {
      // this.$router.push('../pg/index')
      // window.open('../pg/index')
      window.open(path, '_blank')
      console.log(path)
    }
  }
}
</script>

<style>
/* 横向文件 */
.card-file-ppt {
  height: 540px;
}

.card-file-ppt:hover {
  transform: scale3d(1.02, 1.02, 1.02);
  cursor: pointer;
  box-shadow: 0 0 10px royalblue;
}

/* 横向图片 */
.card-img-ppt {
  width: 100%;
  height: 430px;
  display: inline-block;
  margin: 0 auto;
  border-bottom: 1px solid gainsboro;
}

</style>
