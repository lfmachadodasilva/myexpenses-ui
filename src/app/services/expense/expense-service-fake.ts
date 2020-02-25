import { ConfigurationManager } from '../../../configuration/manager';
import { AppConfig } from '../../../configuration/app-config';
import { Expense, ExpenseWithDetails } from '../../models/expense';
import { IExpenseService } from './expense-service';

export class ExpenseServiceFake implements IExpenseService {
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

    async getAllYears(groupId: string): Promise<number[]> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.years);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async getAll(groupId: string): Promise<Expense[]> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1',
                        name: 'Expense 1'
                    },
                    {
                        id: '2',
                        name: 'Expense 2'
                    },
                    {
                        id: '3',
                        name: 'Expense 3'
                    }
                ] as Expense[]);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
    async getAllWithDetails(groupId: string, month: number, year: number): Promise<ExpenseWithDetails[]> {
        throw new Error('Method not implemented.');
    }
    async getWithDetails(id: string): Promise<ExpenseWithDetails> {
        throw new Error('Method not implemented.');
    }
    async get(id: string): Promise<Expense> {
        throw new Error('Method not implemented.');
    }
    async add(obj: Expense): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async update(obj: Expense): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
