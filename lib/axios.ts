import axios from "axios";

// 统一配置代理
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
})

export default apiClient;