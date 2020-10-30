import { expensesFullMockData, expensesMockData, yearsMockData } from '../mockData/expense';
import { ApiType, ConfigModel } from '../models/config';
import { ExpenseFullModel, ExpenseModel } from '../models/expense';
import { ServiceBase } from './base';

export class ExpenseService extends ServiceBase {
    private baseUrl = '/api/expense';

    constructor(protected config: ConfigModel) {
        super(config);
    }

    async getYears(group: number): Promise<number[]> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(yearsMockData);
        }
        return await this.get<number[]>(this.baseUrl + '/years', { group: group });
    }

    async getAllFull(group: number, month: number, year: number): Promise<ExpenseFullModel[]> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(expensesFullMockData);
        }
        return await this.get<ExpenseFullModel[]>(this.baseUrl + '/full', { group: group, month: month, year: year });
    }

    async getAll(group: number): Promise<ExpenseModel[]> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(expensesMockData);
        }
        return await this.get<ExpenseModel[]>(this.baseUrl, { group: group });
    }

    async add(obj: Partial<ExpenseModel>): Promise<ExpenseModel> {
        if (this.config.apiUrl === ApiType.FIREBASE) {
        } else if (this.config.apiUrl === ApiType.LOCAL_STORAGE) {
        } else if (this.config.apiUrl === ApiType.TOTAL_FAKE) {
            return this.resolveMockData(expensesMockData[0]);
        }
        return await this.post<ExpenseModel>(this.baseUrl, {}, obj);
    }

    async update(obj: ExpenseModel): Promise<void> {
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
