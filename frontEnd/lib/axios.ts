import axios from "axios";

// 统一配置代理
const apiClient = axios.create({
    // baseURL: 'http://localhost:8080/api',  // test local
    baseURL: 'http://www.seabee.icu/api/',
    timeout: 120000 // 120s => 限制并发之后有点慢
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