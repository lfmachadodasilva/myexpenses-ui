import { labelsFullMockData, labelsMockData } from '../mockData/label';
import { ApiType, ConfigModel } from '../models/config';
import { LabelFullModel, LabelModel } from '../models/label';
import { ServiceBase } from './base';

export class LabelService extends ServiceBase {
    private baseUrl = '/api/label';

    constructor(protected config: ConfigModel) {
        super(config);
    }

    async getAllFull(group: number, month: number, year: number): Promise<LabelFullModel[]> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(labelsFullMockData);
        }
        return await this.get<LabelFullModel[]>(this.baseUrl + '/full', {
            group: group,
            month: month,
            year: year
        });
    }

    async getAll(group: number): Promise<LabelModel[]> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(labelsMockData);
        }
        return await this.get<LabelModel[]>(this.baseUrl, { group: group });
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
