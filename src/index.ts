import { AxiosRequestConfig } from './types'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeader } from './helpers/headers'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // 先处理headers，否则会被转换成字符串
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  // headers 要添加默认值
  const { headers = {}, data } = config
  return processHeader(headers, data)
}

export default axios
