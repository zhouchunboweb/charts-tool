import axios from 'axios'

// axios.defaults.baseURL = ''
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = ''
axios.defaults.headers.common['xxl_sso_sessionid'] = ''

const header = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,HEAD,GET,PUT,POST,DELETE,PATCH'
}
const postHeader = Object.assign({}, header, {
  'Content-Type': 'application/json;charset=UTF-8'
  // 'Content-Type': 'application/x-www-form-urlencoded'
})

axios.interceptors.request.use(
  config => {
    // 登录拦截
    return config
  },
  error => {
    return Promise.reject(error.request)
  }
)

// http响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    errorHandler(error)
    if (error.msg !== '操作取消') {
    }
    return Promise.reject(error.response)
  }
)

function checkStatus (response) {
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    return response.data
  }
  return {
    success: false,
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  if (!res.status) {
  }
  return res
}

function errorHandler (error) {
  if (error && error.status) {
    switch (error.response.status) {
      case 400:
        error.msg = '错误请求'
        break
      case 401:
        error.msg = '未授权，请重新登录'
        break
      case 403:
        error.msg = '拒绝访问'
        break
      case 404:
        error.msg = '请求错误，未找到该资源'
        break
      case 405:
        error.msg = '请求方法未允许'
        break
      case 408:
        error.msg = '请求超时'
        break
      case 500:
        error.msg = '服务器端出错'
        break
      case 501:
        error.msg = '网络未实现'
        break
      case 502:
        error.msg = '网络错误'
        break
      case 503:
        error.msg = '服务不可用'
        break
      case 504:
        error.msg = '网络超时'
        break
      case 505:
        error.msg = 'http版本不支持该请求'
        break
      default:
        error.msg = `连接错误${error.response.status}`
    }
  } else {
    error.msg = '连接到服务器失败'
  }
  console.log(error.msg)
}

export default {
  get (url, params, timeout = 300000) {
    return axios({
      method: 'get',
      url,
      params,
      timeout,
      headers: header
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  post (url, options, timeout = 300000) {
    return axios({
      method: 'post',
      url,
      data: options,
      timeout,
      headers: postHeader
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  delete (url, params) {
    return axios({
      method: 'delete',
      url,
      params,
      headers: header
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  put (url, options) {
    return axios({
      method: 'put',
      url,
      data: options,
      headers: postHeader
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  patch (url, options) {
    return axios({
      method: 'patch',
      url,
      data: options,
      headers: postHeader
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  }
}
