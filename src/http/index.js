import { hideLoading, showLoading, } from '../utils/Toast'
import axios from 'axios'
import { baseURL, timeout } from './config'



function request(config) {
    showLoading();
    const instance = axios.create({
        baseURL,
        timeout,
        method: config?.method || 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjp7InNob3BfYWNjb3VudF9pZCI6IjEiLCJ0b2tlbl9mbGFnIjoiUHpQaFkzeHlCeDdYb0lTayJ9LCJleHAiOjE2MzE4ODg5OTF9.wwHqvuAOiTcH8Mkm67ax3WlfmH1Mucg9Fdouybfmne0',
        }
    })

    //! 数据过滤
    instance.interceptors.response.use(res => {
        return res.data
    })

    //请求拦截
    instance.interceptors.request.use(function (res) {
        // removePending(config); //在一个axios发送前执行一下判定操作，在removePending中执行取消操作
        /**
         * @addToken
         */
        return res
    }, function (error) {

        return Promise.reject(error)
    })

    // 此处封装一层捕捉错误
    return new Promise((resolve, reject) => {
        instance(config).then(res => {
            hideLoading()
            if (res) {
                if (Array.isArray(res)) {
                    if (res[0]?.jsonrpc) {
                        resolve(res[0]?.result)
                        return
                    }
                }
                resolve(res)
            }

        }).catch(err => {
            hideLoading();
            if (err.response) {


            }
            resolve(false);
        })
    })
}
export default request;
