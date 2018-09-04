import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

axios.defaults.baseURL = '/api'

axios.interceptors.response.use(response => response, (error) => {
    Message({
        message: error.response.data.msg,
        type: 'error',
        onClose() {
            if (error.response.data.code === '419') {
                router.push('/login')
            }
        },
    })
    return Promise.reject(error)
})

Vue.prototype.$http = axios
