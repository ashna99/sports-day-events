import axios, { AxiosInstance } from 'axios';

class AxiosService {
    protected apiClient: AxiosInstance;

    constructor(baseURL: string) {
        this.apiClient = axios.create({
            baseURL: baseURL,
        });
    }

    protected get<T>(url: string, params?: any): Promise<T> {
        return this.apiClient.get(url, { params }).then(res => res.data);
    }

    protected post<T>(url: string, data?: any): Promise<T> {
        return this.apiClient.post(url, data).then(res => res.data);
    }

    protected delete<T>(url: string, params?: any): Promise<T> {
        return this.apiClient.delete(url, { params }).then(res => res.data);
    }
}

export default AxiosService;