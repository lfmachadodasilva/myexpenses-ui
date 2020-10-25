import { groupsFullMockData, groupsMockData } from '../mockData/group';
import { ApiType, ConfigModel } from '../models/config';
import { GroupFullModel, GroupModel } from '../models/group';
import { ServiceBase } from './base';

export class GroupService extends ServiceBase {
    private baseUrl = '/api/group';

    constructor(protected config: ConfigModel) {
        super(config);
    }

    async getAllFull(user: string): Promise<GroupFullModel[]> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(groupsFullMockData);
            //return this.rejectMockData();
        }
        return await this.get<GroupFullModel[]>(this.baseUrl + '/full', { user: user });
    }

    async getAll(userId: string): Promise<GroupModel[]> {
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
