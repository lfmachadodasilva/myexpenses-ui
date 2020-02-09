import { ConfigurationManager } from '../../../configuration/manager';
import { AppConfig } from '../../../configuration/app-config';
import { IService } from '../service-base';
import { Expense } from '../../models/expense';

export class ExpenseServiceFake implements IService<Expense> {
    config: AppConfig = ConfigurationManager.get();

    years: number[];
    yearsCollection = 'years';

    /**
     *
     */
    constructor() {
        this.years = JSON.parse(localStorage.getItem(this.yearsCollection)) as number[];
        if (this.years === null || this.years.length === 0) {
            const currentYear = new Date().getFullYear();
            this.years = [];
            for (let i = 0; i < 5; i++) {
                this.years.push(currentYear - i);
            }
            localStorage.setItem(this.yearsCollection, JSON.stringify(this.years));
        }
    }

    public async getAllYears(_groupId: string): Promise<number[]> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.years);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    public async getAll(groupId: string): Promise<Expense[]> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1',
                        name: 'Expense 1',
                        groupId: groupId
                    },
                    {
                        id: '2',
                        name: 'Expense 2',
                        groupId: groupId
                    },
                    {
                        id: '3',
                        name: 'Expense 3',
                        groupId: groupId
                    }
                ] as Expense[]);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
    public async get(id: string): Promise<Expense> {
        throw new Error('Method not implemented.');
    }
    public async add(obj: Expense): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async update(obj: Expense): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
