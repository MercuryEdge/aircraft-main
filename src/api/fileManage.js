import request from '@/utils/request'

export default {
  getFileList(searchModel) {
    return request({
      url: '/files/list',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        filename: searchModel.filename,
        fileclass: searchModel.fileclass,
        filetype: searchModel.filetype,
        id: searchModel.id
      }
    })
  },
  getFileListByType(type, searchModel) {
    return request({
      url: `/files/${type}`,
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize
      }
    })
  },
  getFileUUIDById(id) {
    return request({
      url: `/files/uuid/${id}`,
      method: 'get'
    })
  }
}
