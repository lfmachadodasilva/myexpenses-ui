import { User } from 'firebase';

import { ConfigurationManager } from '../../../configuration/manager';
import { AppConfig } from '../../../configuration/app-config';
import { IService } from '../service-base';
import { Expense } from '../../models/expense';
import { ExpenseServiceFirebase } from './expense-service-firebase';
import { ExpenseServiceFake } from './expense-service-fake';

export class ExpenseService implements IService<Expense> {
    user: User;
    config: AppConfig;

    /**
     * Constructor
     */
    constructor(user: User) {
        this.user = user;
        this.config = ConfigurationManager.get();
    }

    public async getAllYears(groupId: string): Promise<number[]> {
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
     * Get all labels
     */
    public async getAll(groupId: string): Promise<Expense[]> {
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

    /**
     * Get expense
     */
    public async get(id: string): Promise<Expense> {
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

    /**
     * Add expense
     */
    public async add(obj: Expense): Promise<void> {
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
    public async update(obj: Expense): Promise<void> {
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
    public async delete(id: string): Promise<void> {
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
