import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import AxiosService from './axios';

class BaseApi extends AxiosService {
    constructor(baseURL: string) {
        super(baseURL); 

        this.apiClient.interceptors.request.use(this.handleRequest.bind(this));
        this.apiClient.interceptors.response.use(this.handleResponse, this.handleError);
    }

    private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }

    private handleResponse(response: AxiosResponse) {
        return response;
    }

    private handleError(error: any) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized, redirecting to login...');
        }
        return Promise.reject(error);
    }
}

export default BaseApi;
