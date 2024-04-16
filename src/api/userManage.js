import request from '@/utils/request'

export default {
  getUserList(searchModel) {
    return request({
      url: '/user/list',
      method: 'get',
      params: {
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        username: searchModel.username,
        statue: searchModel.statue,
        id: searchModel.id
      }
    })
  },
  addUser(user) {
    return request({
      url: '/user',
      method: 'post',
      data: user
    })
  },
  setUserStatue(user) {
    return request({
      url: '/user/forget',
      method: 'put',
      data: user
    })
  },
  getUserById(id) {
    return request({
      url: `/user/${id}`,
      method: 'get'
    })
  },
  updateUser(user) {
    return request({
      url: '/user',
      method: 'put',
      data: user
    })
  },
  saveUser(user) {
    if (user.id === null || user.id === undefined) {
      return this.addUser(user)
    } else {
      return this.updateUser(user)
    }
  },
  forgetUser(user) {
    if (user.id === null || user.id === undefined) {
      return this.setUserStatue(user)
    } else {
      console.log('id is null')
    }
  },
  deleteUserById(id) {
    return request({
      url: `/user/${id}`,
      method: 'delete'
    })
  },
  resetUserPassword(user) {
    return request({
      url: `/user/resetPassword`,
      method: 'put',
      data: user
    })
  }
}
