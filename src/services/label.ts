import { labelsMockData } from '../mockData/label';
import { ApiType, ConfigModel } from '../models/config';
import { LabelModel } from '../models/label';
import { ServiceBase } from './base';

export class LabelService extends ServiceBase {
    private baseUrl = '/api/label';

    constructor(protected config: ConfigModel) {
        super(config);
    }

    async getAll(): Promise<LabelModel[]> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(labelsMockData);
        }
        return await this.get<LabelModel[]>(this.baseUrl);
    }

    async add(obj: Partial<LabelModel>): Promise<LabelModel> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(labelsMockData[0]);
        }
        return await this.post<LabelModel>(this.baseUrl, {}, obj);
    }

    async update(obj: LabelModel): Promise<void> {
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
