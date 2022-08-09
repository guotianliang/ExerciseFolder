import axios from 'axios'
import { cloneDeep } from 'lodash'
const CancelToken = axios.CancelToken

// const source = CancelToken.source()
// 拥有的部门，全量部门+员工，获取全部部门
const cacheUrl = []
// 获取缓存key
const getURL = ({ url, params = '', data = '' }) => {
  try {
    if (data instanceof FormData) {
      return false
    } else {
      return url + JSON.stringify(params) + JSON.stringify(data)
    }
  } catch (e) {
    return false
  }
}
// 缓存数据池
let cacheObj = { };

// 请求映射
const requestPromise = new Map()

// 校验url添加取消token
const addCancelToken = (config) => {
  config.cancelToken = new CancelToken(function executor (c) {
    // executor 函数接收一个 cancel 函数作为参数
    config.cancel = c;
  })
  config.requestKey = getURL(config)
}

// 校验是否有缓存和是否已发送相同请求
const checkCache = ({ requestKey, cancel }) => {
  if (requestKey) {
    const isCacheRequest = cacheUrl.some(v => v.test(requestKey))
    if (!isCacheRequest) {
      return
    }
    if (cacheObj[requestKey]) {
      cancel(requestKey);
    } else if (requestPromise.has(requestKey)) {
      // 有已经发送的相同请求，取消下一次请求.
      cancel(requestKey);
    } else {
      const fun = function proFun () {
        const pro = new Promise((resolve, reject) => {
          proFun.Resolve = resolve
          proFun.Reject = reject
        })
        pro.Resolve = proFun.Resolve
        pro.Reject = proFun.Reject
        return pro
      }
      const pro = fun()
      requestPromise.set(requestKey, pro)
    }
  }
}
// 请求拦截
export const requestInterceptor = (config) => {
  addCancelToken(config)
  checkCache(config)
}
// 响应拦截
export const responseInterceptor = (response) => {
  const { requestKey } = response.config
  if (requestKey) {
    const isCacheRequest = cacheUrl.some(v => v.test(requestKey))
    if (isCacheRequest && response.data.code === 0) {
      cacheObj[requestKey] = cloneDeep(response)
    }
    try {
      // 将本次请求的promise变为成功状态，页面正常读取数据
      if (requestPromise.has(requestKey)) {
        requestPromise.get(requestKey).Resolve(cloneDeep(response))
      }
    } catch (e) {

    }
    requestPromise.delete(requestKey)
  }
}

// 响应错误拦截
export const responseInterceptorError = ({ response }) => {
  // 错误之后将请求变为失败同时删除请求栈
  try {
    const { requestKey } = response.config
    if (requestKey) {
      if (requestPromise.has(requestKey)) {
        requestPromise.get(requestKey).Reject(cloneDeep(response))
      }
      requestPromise.delete(requestKey)
    }
  } catch (e) {
    // todo 非正常报错之后,清空映射表可能导致 页面并发的某些请求进不了then和catch，非并发请求接口没有问题
    requestPromise.clear()
  }
}
// 中断请求错误拦截
export const responseInterceptorCancel = (error) => {
  if (axios.isCancel(error)) {
    if (cacheObj[error.message]) {
      return cloneDeep(cacheObj[error.message])
    } else if (requestPromise.has(error.message)) {
      return requestPromise.get(error.message)
    }
    return false
  } else {
    return false
  }
}
// 清空缓存数据
export const clearCache = () => {
  cacheObj = {}
}
