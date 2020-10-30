import axios, { AxiosError } from 'axios';
import { ConfigModel } from '../models/config';

export enum FetchStatus {
    READY,
    LOADING,
    LOADED,
    ERROR
}

export enum StatusCodes {
    OK = 200,
    ERROR = 500
}

const handleError = async (error: AxiosError) => {
    if (error.response && error.response.status >= StatusCodes.OK) {
        if (process.env.NODE_ENV !== 'test') {
            // avoid show this when is running test
            console.error('Request Failed:', error.config);
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
        }
    }

    return Promise.reject(error);
};

export class ServiceBase {
    constructor(protected config: ConfigModel) {}

    protected async resolveMockData<T>(data: T): Promise<T> {
        return new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve(data);
            }, this.config.requestDelay);
        });
    }

    protected async rejectMockData<T>(): Promise<T> {
        return new Promise((_resolve, reject) => {
            setTimeout(() => {
                reject();
            }, this.config.requestDelay);
        });
    }

    protected async get<TResponse>(url: string, params?: { [key: string]: any }): Promise<TResponse> {
        try {
            const response = await axios.get(url, {
                baseURL: this.config.apiUrl,
                withCredentials: process.env.NODE_ENV !== 'test',
                headers: {
                    Accept: 'application/json; charset=utf=8',
                    Authorization: 'Bearer ' + axios.defaults.headers.common.Authorization
                },
                params
            });
            return response.data as Promise<TResponse>;
        } catch (error) {
            return handleError(error);
        }
    }

    protected async post<TResponse>(url: string, params?: { [key: string]: any }, data?: any): Promise<TResponse> {
        try {
            const response = await axios.post(url, data, {
                baseURL: this.config.apiUrl,
                withCredentials: process.env.NODE_ENV !== 'test',
                headers: {
                    Accept: 'application/json; charset=utf=8',
                    Authorization: 'Bearer ' + axios.defaults.headers.common.Authorization
                },
                params
            });
            return response.data as Promise<TResponse>;
        } catch (error) {
            return handleError(error);
        }
    }

    protected async put<TResponse>(url: string, params?: { [key: string]: any }, data?: any): Promise<TResponse> {
        try {
            const response = await axios.put(url, data, {
                baseURL: this.config.apiUrl,
                withCredentials: process.env.NODE_ENV !== 'test',
                headers: {
                    Accept: 'application/json; charset=utf=8',
                    Authorization: 'Bearer ' + axios.defaults.headers.common.Authorization
                },
                params
            });
            return response.data as Promise<TResponse>;
        } catch (error) {
            return handleError(error);
        }
    }

    protected async delete<TResponse>(url: string): Promise<TResponse> {
        try {
            const response = await axios.delete(url, {
                baseURL: this.config.apiUrl,
                withCredentials: process.env.NODE_ENV !== 'test',
                headers: {
                    Accept: 'application/json; charset=utf=8',
                    Authorization: 'Bearer ' + axios.defaults.headers.common.Authorization
                }
            });
            return response.data as Promise<TResponse>;
        } catch (error) {
            return handleError(error);
        }
    }
}
