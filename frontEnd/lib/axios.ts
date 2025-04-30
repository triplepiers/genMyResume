import axios from "axios";

// 统一配置代理
const apiClient = axios.create({
    // baseURL: 'http://localhost:8080',  // test local
    baseURL: 'http://20.2.117.32/api', // test remote
    timeout: 60000 // 60s
})

// 请求拦截器：给 GET / POST 统一塞 phone
apiClient.interceptors.request.use((config: any) => {
    let phone = localStorage.getItem('account');
    if (phone) {
        if (config.method === 'get') {
            config.params = {
                phone,
                ...config.params
            }
        } else if (config.method === 'post') {
            config.data = {
                phone,
                ...config.data
            }
        }
    } else {
        return config
        // return Promise.reject(new Error('not Log In'))
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

// 错误处理
apiClient.interceptors.response.use(
(config) => {
    return config
}, 
(err) => {
    console.log(err)
})

export default apiClient;