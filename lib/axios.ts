import axios from "axios";

// 统一配置代理
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
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
        return Promise.reject(new Error('not Log In'))
    }
    return config
    console.log(config.method)
}, (err) => {
    return Promise.reject(err)
})

// 错误处理
apiClient.interceptors.response.use(
(res) => {
    return res
}, 
(err) => {
    console.log(err)
})

export default apiClient;