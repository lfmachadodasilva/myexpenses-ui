import { groupsMockData } from '../mockData/group';
import { ApiType, ConfigModel } from '../models/config';
import { GroupModel } from '../models/group';
import { ServiceBase } from './base';

export class GroupService extends ServiceBase {
    private baseUrl = '/api/group';

    constructor(protected config: ConfigModel) {
        super(config);
    }

    async getAll(): Promise<GroupModel[]> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(groupsMockData);
        }
        return await this.get<GroupModel[]>(this.baseUrl);
    }

    async add(obj: Partial<GroupModel>): Promise<GroupModel> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(groupsMockData[0]);
        }
        return await this.post<GroupModel>(this.baseUrl, {}, obj);
    }

    async update(obj: GroupModel): Promise<void> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData<void>(undefined);
        }
        return await this.put<void>(this.baseUrl, {}, obj);
    }

    async remove(id: number): Promise<void> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData<void>(undefined);
        }
        return await this.delete<void>(this.baseUrl + '/' + id);
    }
}
