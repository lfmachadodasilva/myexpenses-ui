import { ServiceBase } from './serviceBase';
import { AppConfig } from '../configurations/appConfig';
import { LabelModel, LabelFullModel } from '../models/label';

export class LabelService extends ServiceBase {
    private baseUrl = '/api/label';

    constructor(protected config: AppConfig) {
        super(config);
    }

    async getAll(group: number): Promise<LabelModel[]> {
        return await this.get<LabelModel[]>(this.baseUrl, { group });
    }

    async getFullAll(group: number, month: number, year: number): Promise<LabelFullModel[]> {
        return await this.get<LabelFullModel[]>(this.baseUrl + '/full', {
            group,
            month,
            year
        });
    }

    async add(group: number, label: LabelModel): Promise<LabelModel> {
        return await this.post<LabelModel>(this.baseUrl, { group }, label);
    }

    async update(label: LabelModel): Promise<void> {
        return await this.put<void>(this.baseUrl, {}, label);
    }

    async remove(id: number): Promise<void> {
        return await this.delete<void>(this.baseUrl + '/' + id);
    }
}
