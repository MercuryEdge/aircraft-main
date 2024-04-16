<template>
  <div>
    <!-- 搜索栏 -->
    <el-card id="search">
      <el-row>
        <el-col :span="20">
          <el-input v-model="searchModel.filename" label="资料查阅" placeholder="文件名称" clearable />
          <el-select v-model="searchModel.filetype" placeholder="文件分类" clearable @change="getFileList">
            <el-option label="电子书籍" :value="0" />
            <el-option label="指导手册" :value="1" />
            <el-option label="视频讲解" :value="2" />
            <el-option label="法规规范" :value="3" />
            <el-option label="其它资料" :value="4" />
            <el-option label="系统原理" :value="5" />
          </el-select>
          <el-button type="primary" round icon="el-icon-search" @click="getFileList">查询</el-button>
          <el-button round icon="el-icon-delete" @click="getFileListAll">重置查询</el-button>
        </el-col>
        <el-col :span="4" align="right">
          <!-- <el-button type="primary" circle icon="el-icon-plus" @click="openEditUI(null)"></el-button> -->
        </el-col>
      </el-row>
    </el-card>

    <el-pagination
      :current-page="searchModel.pageNo"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 结果列表 -->
    <el-card>
      <el-table :data="fileList" border style="width: 100%">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">
            {{ (searchModel.pageNo - 1) * searchModel.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="filecover" label="封面" width="200">
          <template slot-scope="scope">
            <img
              v-if="scope.row.filecover != null"
              :src="basePath + '/covers/' + scope.row.filecover"
              class="fileCoverImg"
            >
          </template>
        </el-table-column>
        <el-table-column prop="filename" label="文件名称" />
        <el-table-column prop="fileintro" label="文件简介" />
        <el-table-column prop="filetype" label="文件分类" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.filetype == 0" effect="plain" type="warning">电子书籍</el-tag>
            <el-tag v-else-if="scope.row.filetype == 1" effect="plain" type="success">指导手册</el-tag>
            <el-tag v-else-if="scope.row.filetype == 2" effect="plain" type="danger">视频讲解</el-tag>
            <el-tag v-else-if="scope.row.filetype == 3" effect="plain">法规规范</el-tag>
            <el-tag v-else-if="scope.row.filetype == 4" effect="plain">其它资料</el-tag>
            <el-tag v-else-if="scope.row.filetype == 5" effect="plain">系统原理</el-tag>
            <el-tag v-else effect="plain" type="info">未分类</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="290px">
          <template slot-scope="scope">
            <span>
              <el-button type="success" icon="el-icon-view" round @click="handlePriview(scope.row.id)">预览</el-button>
            </span>
            <span style="margin-left:10px">
              <a :href="basePath + '/docs/' + scope.row.fileuuid" target="_blank"><el-button
                type="primary"
                icon="el-icon-copy-document"
                round
              >查看</el-button></a>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="searchModel.pageNo"
      :page-sizes="[5, 10, 50, 100]"
      :page-size="searchModel.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 文件预览对话框 -->
    <el-dialog :visible.sync="priviewDialogVisible" width="80%" top="5vh" title="文件预览">
      <embed :src="filePath" style="width:100%;height: 80vh;">
    </el-dialog>
  </div>
</template>

<script>
import fileApi from '@/api/fileManage'
import avatar from 'element-ui/packages/avatar'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      headerObj: {
        Token: getToken()
      },
      basePath: process.env.VUE_APP_BASE_API,
      formLabelWidth: '130px',
      title: '',
      dialogFormVisible: false,
      priviewDialogVisible: false,
      total: 0,
      fileForm: {
        filename: '',
        fileintro: '',
        fileclass: '',
        filetype: '',
        fileuuid: undefined,
        filecover: undefined
      },
      filePath: '',
      searchModel: {
        id: '',
        filename: '',
        fileintro: '',
        filetype: '',
        filecover: '',
        pageNo: 1,
        pageSize: 5
      },
      fileList: []
    }
  },
  computed: {
    avatar() {
      return avatar
    }
  },
  created() {
    this.getFileList()
  },
  methods: {
    handleSizeChange(pageSize) {
      this.searchModel.pageSize = pageSize
      this.getFileList()
    },
    handleCurrentChange(pageNo) {
      this.searchModel.pageNo = pageNo
      this.getFileList()
    },
    handlePriview(id) {
      this.priviewDialogVisible = true
      fileApi.getFileUUIDById(id).then(response => {
        this.filePath = this.basePath + '/docs/' + response.data
      })
    },
    getFileList() {
      fileApi.getFileList(this.searchModel).then(response => {
        this.fileList = response.data.rows
        this.total = response.data.total
      })
    },
    getFileListAll() {
      this.searchModel.filename = ''
      this.searchModel.fileclass = ''
      this.searchModel.filetype = ''
      this.searchModel.pageNo = 1
      this.getFileList()
    },
    clearForm() {
      this.fileForm = {}
      this.$refs.fileFormRef.clearValidate()
      this.$refs.fileUploadRef.clearFiles()
      this.$refs.coverUploadRef.clearFiles()
    },
    getFileUUID(res) {
      this.fileForm.fileuuid = res.uuid
      console.log('fileuuid: ' + res.uuid)
    },
    getCoverUUID(res) {
      this.fileForm.filecover = res.uuid
      console.log('filecover: ' + res.uuid)
    }
  }
}
</script>

<style>
#search .el-input {
  width: 200px;
  margin-right: 10px;
}

.el-dialog .el-input {
  width: 85%;
}

.fileCoverImg {
  width: 150px;
  height: 200px;
}
</style>
