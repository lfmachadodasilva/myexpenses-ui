import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { StatusCodes } from './status-code';
import { ConfigurationManager } from '../../configuration/manager';
import { AppConfig } from '../../configuration/app-config';

export class ServiceBase {
    config: AppConfig;

    constructor(private authToken: string) {
        this.config = ConfigurationManager.get();
    }

    protected async getWithParams<TResponse>(url: string, params: any): Promise<TResponse> {
        const requestConfig: Partial<AxiosRequestConfig> = {
            ...params,
            baseURL: this.config.apiUrl,
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json; charset=utf-8',
                Authorization: 'Bearer ' + this.authToken
            },
            withCredentials: true
        };

        try {
            const response = await axios.get<TResponse>(url, requestConfig);
            return response.data;
        } catch (error) {
            return handleError(error);
        }
    }
}

export const handleError = (error: AxiosError) => {
    if (error.response && error.response.status !== StatusCodes.NotFound && error.response.status >= StatusCodes.OK) {
        console.log('Request Failed:', error.config);
        // Request was made but server responded with something
        // other than 2xx
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
        console.log('Headers:', error.response.headers);
    }

    return Promise.reject(error);
};
