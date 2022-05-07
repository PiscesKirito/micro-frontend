import axios, { AxiosRequestConfig, Canceler } from "axios";

const http = axios.create({
  timeout: 5000
})

http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

var CancelToken = axios.CancelToken

interface Request {
  umet: string,
  cancel: Canceler
}
let requests: Request[] = []

// http防抖
let cancelRequest = (config: AxiosRequestConfig<any>) => {
  for (let index in requests) {
    if(requests[index].umet === config.url + '&' + config.method) {
      requests[index].cancel("取消请求")
      requests.splice(Number(index), 1)
    }
  }
}

// 请求拦截器
http.interceptors.request.use(
  config => {
    cancelRequest(config)
    config.cancelToken = new CancelToken((c) => {
      requests.push({ umet: config.url + '&' + config.method, cancel: c })
    })
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
http.interceptors.response.use(
  config => {
    if (config.data.statusCode >= 3000) {
      console.log({content: config.data.msg})
    }
    cancelRequest(config.config)
    return config.data
  },
  // 此处可通过switch...case
  error => Promise.reject(error.response)
)

// 封装Get请求
function get(url: string, params: any) {
  return new Promise((resolve, reject) => {
    http.get(url, {params: params})
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err.data)
    })
  })
}

// 封装Post请求
function post(url: string, params: Object) {
  return new Promise((resolve, reject) => {
    http.post(url, params)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      reject(err.data)
    })
  })
}

export { get, post }
