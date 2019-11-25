import axios from 'axios'

import { getToken, removeToken } from '../utils/token'

// 设置基地址
axios.defaults.baseURL = 'http://183.237.67.218:3002';
// 设置跨域携带cookie
axios.defaults.withCredentials = true;

// axios.defaults 统一设置
import { Message } from "element-ui"

// 导入路由


// 暴露登录axios
export function login(data) {
  return axios({
    url: '/login',
    method: 'post',
    data,
  });
}

// 暴露注册接口
export function register(data) {
  return axios({
    url: '/register',
    method: 'post',
    data,
  });
}

// 发送短信接口
export function sendsms(data) {
  return axios({
    url: '/sendsms',
    method: 'post',
    data,
  });
}

// 根据token获取用户信息
export function userInfo() {
  return axios({
    url: '/user/info',
    method: 'get',
  })
}

axios.interceptors.request.use(
  function (config) {
    // 为config 统一设置token
    config.headers.token = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
// axios 直接使用的.then之前
// response 服务器响应的内容
axios.interceptors.response.use(
  function (response) {
    // 判断token
    // 有bug 新增学科不输入数据会有bug，之后看看
    if (response.data.code === 0) {
      // 提示
      Message.error(response.data);
      // 删除token
      removeToken();
      // 去登录页
      return;
    } 
      return response;
    
  },
  function (error) {
    return Promise.reject(error);
  }
);

// subject 页面的方法暴露
// export const subject = {
//   // 新增
//   add(data){
//     return axios({
//       url: "/subject/add",
//       method:"post",
//       data
//     })
//   },
//   // 列表
//   list(params){
//     return axios({
//       url: "/subject/list",
//       method:"get",
//       params
//     })
//   },
//   // 状态
//   state(date){
//     return {
//       axios 
//     }
//   }
// }
// 作用域 抽取学科接口
// subject.add subject.remove
export const subject = {
  // 新增
  add(data) {
    return axios({
      url: "/subject/add",
      method: "post",
      data
    })
  },
  // 列表
  // get请求的参数用params来传递
  list(params) {
    return axios({
      url: "/subject/list",
      method: "get",
      params
    })
  },
  // 状态
  status(data) {
    return axios({
      url: "/subject/status",
      method: "post",
      data
    })
  },
  // 编辑
  edit(data) {
    return axios({
      url: "/subject/edit",
      method: "post",
      data
    })
  },
  // 删除
  remove(data) {
    return axios({
      url: "/subject/remove",
      method: "post",
      data
    })
  },
}