import { usersMockData } from '../mockData/user';
import { ApiType, ConfigModel } from '../models/config';
import { UserModel } from '../models/user';
import { ServiceBase } from './base';

export class UserService extends ServiceBase {
    private baseUrl = '/api/user';

    constructor(protected config: ConfigModel) {
        super(config);
    }

    async addOrUpdate(user: UserModel): Promise<UserModel> {
        return await this.post<UserModel>('/api/user', {}, user);
    }

    async getAll(): Promise<UserModel[]> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(usersMockData);
        }
        return await this.get<UserModel[]>(this.baseUrl);
    }

    async add(obj: Partial<UserModel>): Promise<UserModel> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(usersMockData[0]);
        }
        return await this.post<UserModel>(this.baseUrl, {}, obj);
    }

    async update(obj: UserModel): Promise<void> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData<void>(undefined);
        }
        return await this.put<void>(this.baseUrl, {}, obj);
    }

    async remove(id: string): Promise<void> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData<void>(undefined);
        }
        return await this.delete<void>(this.baseUrl + '/' + id);
    }
}
