import { ServiceBase } from './serviceBase';
import { AppConfig } from '../configurations/appConfig';
import { LabelModel } from '../models/label';

export class LabelService extends ServiceBase {
    constructor(protected config: AppConfig) {
        super(config);
    }

    async getAll(): Promise<LabelModel[]> {
        return await this.get<LabelModel[]>('/api/label');
    }
}
