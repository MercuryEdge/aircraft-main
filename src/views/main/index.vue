<template>
  <div class="mainDiv">
    <div>
      <el-carousel indicator-position="outside" height="500px" :interval="3000">
        <el-carousel-item v-for="item in imgList" :key="item.src">
          <el-image style="width: 100vw;height: 500px;" :src="baseUrl + item.src" fit="cover" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-if="this.$store.state.user.statue == 2">
      <el-card>
        <h2>虚拟仿真</h2>
        <img class="card-img-point" :src="baseUrl + '/covers/' + 'unity.png'">
        <el-link
          :underline="false"
          :href="u3dUrl"
          target="_blank"
          style="margin-bottom: 20px;margin-top: 20px;"
        ><el-button
          type="primary"
          round
          style="width: 200px;"
        >开始学习</el-button></el-link>
      </el-card>
    </div>
    <div class="v-file-list-ppt">
      <el-card>
        <el-row>
          <el-col :span="6">
            <h2>系统原理</h2>
          </el-col>
          <el-col :span="18" align="right">
            <el-pagination
              :current-page="searchModelPPT.pageNo"
              :page-size="4"
              layout="prev, pager, next"
              :total="totalPPT"
              @current-change="handleCurrentChangePPT"
            />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-for="file in fileListPPT" :key="file.id" :span="6">
            <el-card class="card-file-wide" :body-style="{ padding: '0' }">
              <img
                class="card-img-wide"
                :src="baseUrl + '/covers/' + file.filecover"
                @click="exl(serverUrl+shareUrl+pptUrl + file.fileuuid)"
              >
              <div style="text-align: center;" @click="exl(serverUrl+shareUrl+ pptUrl + file.fileuuid)">
                <div class="fileNameDiv">
                  <h3>{{ file.filename }}</h3>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="v-file-list-book">
      <el-card>
        <el-row>
          <el-col :span="6">
            <h2>电子书籍</h2>
          </el-col>
          <el-col :span="18" align="right">
            <el-pagination
              :current-page="searchModelBook.pageNo"
              :page-size="6"
              layout="prev, pager, next"
              :total="totalBook"
              @current-change="handleCurrentChangeBook"
            />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-for="file in fileListBook" :key="file.id" :span="4">
            <el-card class="card-file" :body-style="{ padding: '0' }">
              <img
                class="card-img"
                :src="baseUrl + '/covers/' + file.filecover"
                @click="exl(baseUrl + '/docs/' + file.fileuuid)"
              >
              <div style="text-align: center;" @click="exl(baseUrl + '/docs/' + file.fileuuid)">
                <div class="fileNameDiv">
                  <h3>{{ file.filename }}</h3>
                </div>
                <!-- <div class="fileIntroDiv">
                  <h5>{{ file.fileintro }}</h5>
                </div> -->
                <!-- <div>
                  <span>
                    <el-tag v-if="file.fileclass == 0" effect="plain" type="success">涡扇发动机</el-tag>
                    <el-tag v-else-if="file.fileclass == 1" effect="plain" type="warning">APU</el-tag>
                    <el-tag v-else-if="file.fileclass == 2" effect="plain">起落架</el-tag>
                    <el-tag v-else-if="file.fileclass == 3" effect="plain">活塞发动机</el-tag>
                    <el-tag v-else effect="plain" type="danger">未分类</el-tag>
                  </span>
                  <span style="margin-left: 5px;">
                    <el-tag v-if="file.filetype == 0" effect="plain" type="success">电子书籍</el-tag>
                    <el-tag v-else-if="file.filetype == 1" effect="plain" type="warning">指导手册</el-tag>
                    <el-tag v-else-if="file.filetype == 2" effect="plain">视频讲解</el-tag>
                    <el-tag v-else-if="file.filetype == 3" effect="plain">法规规范</el-tag>
                    <el-tag v-else-if="file.filetype == 4" effect="plain">其它资料</el-tag>
                    <el-tag v-else-if="file.filetype == 5" effect="plain">系统原理</el-tag>
                    <el-tag v-else effect="plain" type="danger">未分类</el-tag>
                  </span>
                  <span style="margin-left: 5px;">
                    <a :href="baseUrl + '/docs/' + file.fileuuid" target="_blank"><el-button type="primary"
                        icon="el-icon-copy-document" style="float: right;" round size="small">查看</el-button></a>
                  </span>
                   </div> -->
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="v-file-list-manual">
      <el-card>
        <el-row>
          <el-col :span="6">
            <h2>指导手册</h2>
          </el-col>
          <el-col :span="18" align="right">
            <el-pagination
              :current-page="searchModelManual.pageNo"
              :page-size="6"
              layout="prev, pager, next"
              :total="totalManual"
              @current-change="handleCurrentChangeManual"
            />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-for="file in fileListManual" :key="file.id" :span="4">
            <el-card class="card-file" :body-style="{ padding: '0' }">
              <img
                class="card-img"
                :src="baseUrl + '/covers/' + file.filecover"
                @click="exl(baseUrl + '/docs/' + file.fileuuid)"
              >
              <div style="text-align: center;" @click="exl(baseUrl + '/docs/' + file.fileuuid)">
                <div class="fileNameDiv">
                  <h3>{{ file.filename }}</h3>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="v-file-list-video">
      <el-card>
        <el-row>
          <el-col :span="6">
            <h2>视频讲解</h2>
          </el-col>
          <el-col :span="18" align="right">
            <el-pagination
              :current-page="searchModelVideo.pageNo"
              :page-size="4"
              layout="prev, pager, next"
              :total="totalVideo"
              @current-change="handleCurrentChangeVideo"
            />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-for="file in fileListVideo" :key="file.id" :span="6">
            <el-card class="card-file-wide" :body-style="{ padding: '0' }">
              <img
                class="card-img-wide"
                :src="baseUrl + '/covers/' + file.filecover"
                @click="exl(baseUrl + '/docs/' + file.fileuuid)"
              >
              <div style="text-align: center;" @click="exl(baseUrl + '/docs/' + file.fileuuid)">
                <div class="fileNameDiv">
                  <h3>{{ file.filename }}</h3>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="v-file-list-law">
      <el-card>
        <el-row>
          <el-col :span="6">
            <h2>法规规范</h2>
          </el-col>
          <el-col :span="18" align="right">
            <el-pagination
              :current-page="searchModelLaw.pageNo"
              :page-size="6"
              layout="prev, pager, next"
              :total="totalLaw"
              @current-change="handleCurrentChangeLaw"
            />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-for="file in fileListLaw" :key="file.id" :span="4">
            <el-card class="card-file" :body-style="{ padding: '0' }">
              <img
                class="card-img"
                :src="baseUrl + '/covers/' + file.filecover"
                @click="exl(baseUrl + '/docs/' + file.fileuuid)"
              >
              <div style="text-align: center;" @click="exl(baseUrl + '/docs/' + file.fileuuid)">
                <div class="fileNameDiv">
                  <h3>{{ file.filename }}</h3>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="v-file-list-other">
      <el-card>
        <el-row>
          <el-col :span="6">
            <h2>其它资料</h2>
          </el-col>
          <el-col :span="18" align="right">
            <el-pagination
              :current-page="searchModelOther.pageNo"
              :page-size="6"
              layout="prev, pager, next"
              :total="totalOther"
              @current-change="handleCurrentChangeOther"
            />
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col v-for="file in fileListOther" :key="file.id" :span="4">
            <el-card class="card-file" :body-style="{ padding: '0' }">
              <img
                class="card-img"
                :src="baseUrl + '/covers/' + file.filecover"
                @click="exl(baseUrl + '/docs/' + file.fileuuid)"
              >
              <div style="text-align: center;" @click="exl(baseUrl + '/docs/' + file.fileuuid)">
                <div class="fileNameDiv">
                  <h3>{{ file.filename }}</h3>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-card style="background-color: cornflowerblue;">
      <div style="text-align: center;color: aliceblue;">
        <h2>飞机结构与系统（CFM56发动机）虚拟仿真教学平台</h2>
      </div>
    </el-card>
    <el-backtop />
  </div>
</template>

<script>
import fileApi from '@/api/fileManage'
import 'element-ui/lib/theme-chalk/base.css'

export default {
  data() {
    return {
      show: false,
      serverUrl: 'http://172.20.10.5', // 虚拟机的IP地址
      shareUrl: '/op/view.aspx?src=', // OfficeOnlineServer索引PPT的路径，不必修改
      pptUrl: '%5C%5CWIN-6F1F6AM4VTK%5Cppt%5C', // 虚拟机中存放PPT文件夹的网络路径
      u3dUrl: 'http://172.20.10.5:100/caucd/bjsb', // 虚拟机中存放u3d的路径
      baseUrl: process.env.VUE_APP_BASE_API,
      imgList: [{ src: '/slogans/1-slogan.jpg' }, { src: '/slogans/2-slogan.jpg' }, { src: '/slogans/3-slogan.jpg' }],
      formLabelWidth: '130px',
      totalPPT: 0,
      totalBook: 0,
      totalManual: 0,
      totalVideo: 0,
      totalLaw: 0,
      totalOther: 0,
      searchModelPPT: {
        filetype: 0,
        pageNo: 1,
        pageSize: 4
      },
      searchModelBook: {
        filetype: 0,
        pageNo: 1,
        pageSize: 6
      },
      searchModelManual: {
        filetype: 0,
        pageNo: 1,
        pageSize: 6
      },
      searchModelVideo: {
        filetype: 0,
        pageNo: 1,
        pageSize: 4
      },
      searchModelLaw: {
        filetype: 0,
        pageNo: 1,
        pageSize: 6
      },
      searchModelOther: {
        filetype: 0,
        pageNo: 1,
        pageSize: 6
      },
      fileListPPT: [],
      fileListBook: [],
      fileListManual: [],
      fileListVideo: [],
      fileListLaw: [],
      fileListOther: []
    }
  },
  created() {
    this.getFileList(0)
    this.getFileList(1)
    this.getFileList(2)
    this.getFileList(3)
    this.getFileList(4)
    this.getFileList(5)
    this.show = true
    console.log(this.$store.state.user.statue)
  },
  methods: {
    handleCurrentChangeBook(pageNo) {
      this.show = false
      this.searchModelBook.pageNo = pageNo
      this.getFileList(0)
      this.show = true
    },
    handleCurrentChangeManual(pageNo) {
      this.show = false
      this.searchModelManual.pageNo = pageNo
      this.getFileList(1)
      this.show = true
    },
    handleCurrentChangeVideo(pageNo) {
      this.show = false
      this.searchModelVideo.pageNo = pageNo
      this.getFileList(2)
      this.show = true
    },
    handleCurrentChangeLaw(pageNo) {
      this.show = false
      this.searchModelLaw.pageNo = pageNo
      this.getFileList(3)
      this.show = true
    },
    handleCurrentChangeOther(pageNo) {
      this.show = false
      this.searchModelOther.pageNo = pageNo
      this.getFileList(4)
      this.show = true
    },
    handleCurrentChangePPT(pageNo) {
      this.show = false
      this.searchModelPPT.pageNo = pageNo
      this.getFileList(5)
      this.show = true
    },
    getFileList(type) {
      switch (type) {
        case 0: fileApi.getFileListByType(0, this.searchModelBook).then(response => {
          this.fileListBook = response.data.rows
          this.totalBook = response.data.total
        }); break
        case 1: fileApi.getFileListByType(1, this.searchModelManual).then(response => {
          this.fileListManual = response.data.rows
          this.totalManual = response.data.total
        }); break
        case 2: fileApi.getFileListByType(2, this.searchModelVideo).then(response => {
          this.fileListVideo = response.data.rows
          this.totalVideo = response.data.total
        }); break
        case 3: fileApi.getFileListByType(3, this.searchModelLaw).then(response => {
          this.fileListLaw = response.data.rows
          this.totalLaw = response.data.total
        }); break
        case 4: fileApi.getFileListByType(4, this.searchModelOther).then(response => {
          this.fileListOther = response.data.rows
          this.totalOther = response.data.total
        }); break
        case 5: fileApi.getFileListByType(5, this.searchModelPPT).then(response => {
          this.fileListPPT = response.data.rows
          this.totalPPT = response.data.total
        }); break
      }
    },
    exl(path) {
      window.open(path, '_blank')
      console.log(path)
    }
  }
}
</script>

<style>
/* 纵向文件 */
.card-file {
  height: 450px;
}

/* 横向文件 */
.card-file-wide {
  height: 350px;
}

.card-file:hover {
  transform: scale3d(1.02, 1.02, 1.02);
  cursor: pointer;
  box-shadow: 0 0 10px royalblue;
}

.card-file-wide:hover {
  transform: scale3d(1.02, 1.02, 1.02);
  cursor: pointer;
  box-shadow: 0 0 10px royalblue;
}

/* 纵向图片 */
.card-img {
  width: 100%;
  height: 370px;
  display: inline-block;
  margin: 0 auto;
  border-bottom: 1px solid gainsboro;
}
/* 横向图片 */
.card-img-wide {
  width: 100%;
  height: 270px;
  display: inline-block;
  margin: 0 auto;
  border-bottom: 1px solid gainsboro;
}

.fileNameDiv {
  font-size: 12pt;
}

.fileIntroDiv {
  font-size: 10pt;
  color: gray;
}
</style>
