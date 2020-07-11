import { ServiceBase } from './serviceBase';
import { AppConfig } from '../configurations/appConfig';
import { ExpenseModel, ExpenseFullModel } from '../models/expense';

export class ExpenseService extends ServiceBase {
    private baseUrl = '/api/expense';

    constructor(protected config: AppConfig) {
        super(config);
    }

    async getAll(): Promise<ExpenseModel[]> {
        return await this.get<ExpenseModel[]>(this.baseUrl);
    }

    async getFullAll(group: number, month: number, year: number): Promise<ExpenseFullModel[]> {
        return await this.get<ExpenseFullModel[]>(this.baseUrl + '/full', {
            group,
            month,
            year
        });
    }

    async add(obj: Partial<ExpenseModel>): Promise<ExpenseModel> {
        return await this.post<ExpenseModel>(this.baseUrl, {}, obj);
    }

    async update(obj: ExpenseModel): Promise<void> {
        return await this.put<void>(this.baseUrl, {}, obj);
    }

    async remove(id: number): Promise<void> {
        return await this.delete<void>(this.baseUrl + '/' + id);
    }
}
