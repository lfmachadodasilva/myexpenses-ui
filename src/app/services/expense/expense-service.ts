import { User } from 'firebase/app';

import { ConfigurationManager } from '../../../configuration/manager';
import { AppConfig } from '../../../configuration/app-config';
import { Expense, ExpenseWithDetails } from '../../models/expense';
import { ExpenseServiceFirebase } from './expense-service-firebase';
import { ExpenseServiceFake } from './expense-service-fake';

export interface IExpenseService {
    getAllYears(groupId: string): Promise<number[]>;
    getAll(groupId: string): Promise<Expense[]>;
    getAllWithDetails(groupId: string, month: number, year: number): Promise<ExpenseWithDetails[]>;
    get(id: string): Promise<Expense>;
    getWithDetails(id: string): Promise<ExpenseWithDetails>;
    add(obj: Expense): Promise<void>;
    update(obj: Expense): Promise<void>;
    delete(id: string): Promise<void>;
}

export class ExpenseService implements IExpenseService {
    user: User;
    config: AppConfig;

    /**
     * Constructor
     */
    constructor(user: User) {
        this.user = user;
        this.config = ConfigurationManager.get();
    }

    async getAllYears(groupId: string): Promise<number[]> {
        if (this.config.enableFakeDatabase) {
            const service = new ExpenseServiceFake();
            return service.getAllYears(groupId);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new ExpenseServiceFirebase(this.user);
            return service.getAllYears(groupId);
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }

    /**
     * Get all expenses
     */
    async getAll(groupId: string): Promise<Expense[]> {
        if (this.config.enableFakeDatabase) {
            const service = new ExpenseServiceFake();
            return service.getAll(groupId);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new ExpenseServiceFirebase(this.user);
            return service.getAll(groupId);
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }

    getAllWithDetails(groupId: string, month: number, year: number): Promise<ExpenseWithDetails[]> {
        console.log(groupId, month, year, this.config);
        if (this.config.enableFakeDatabase) {
            const service = new ExpenseServiceFake();
            return service.getAllWithDetails(groupId, month, year);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new ExpenseServiceFirebase(this.user);
            return service.getAllWithDetails(groupId, month, year);
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }

    /**
     * Get expense
     */
    async get(id: string): Promise<Expense> {
        if (this.config.enableFakeDatabase) {
            const service = new ExpenseServiceFake();
            return service.get(id);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new ExpenseServiceFirebase(this.user);
            return service.get(id);
        }

        return new Promise(resolve => {
            // TODO
            resolve(null);
        });
    }

    getWithDetails(id: string): Promise<ExpenseWithDetails> {
        throw new Error('Method not implemented.');
    }

    /**
     * Add expense
     */
    async add(obj: Expense): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new ExpenseServiceFake();
            return service.add(obj);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new ExpenseServiceFirebase(this.user);
            return service.add(obj);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }

    /**
     * Update expense
     */
    async update(obj: Expense): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new ExpenseServiceFake();
            return service.update(obj);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new ExpenseServiceFirebase(this.user);
            return service.update(obj);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }

    /**
     * Delete label
     */
    async delete(id: string): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new ExpenseServiceFake();
            return service.delete(id);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new ExpenseServiceFirebase(this.user);
            return service.delete(id);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }
}
