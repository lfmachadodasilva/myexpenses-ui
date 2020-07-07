import { ServiceBase } from './serviceBase';
import { AppConfig } from '../configurations/appConfig';
import { GroupModel, GroupFullModel } from '../models/group';

export class GroupService extends ServiceBase {
    private baseUrl = '/api/group';

    constructor(protected config: AppConfig) {
        super(config);
    }

    async getAll(): Promise<GroupModel[]> {
        return await this.get<GroupModel[]>(this.baseUrl);
    }

    async getFullAll(): Promise<GroupFullModel[]> {
        return await this.get<GroupFullModel[]>(this.baseUrl + '/full');
    }

    async add(group: GroupFullModel): Promise<GroupFullModel> {
        return await this.post<GroupFullModel>(this.baseUrl, {}, group);
    }

    async update(group: GroupFullModel): Promise<void> {
        return await this.put<void>(this.baseUrl, {}, group);
    }

    async remove(groupId: number): Promise<void> {
        return await this.delete<void>(this.baseUrl + '/' + groupId);
    }
}
