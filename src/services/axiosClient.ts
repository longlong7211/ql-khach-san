import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BASE_URL || "locahost:3000",
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        })

        this.axiosInstance.interceptors.request.use(
            (config) => {
                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('token')
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`
                    }
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
            return response;
        }, (error) => Promise.reject(error))
    }

    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }

    async post<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data, config);
        return response.data;
    }

    async put<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url, config);
        return response.data;
    }
}

const apiService = new ApiService();
export default apiService;