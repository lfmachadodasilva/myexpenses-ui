import { Label } from '../../models/label';
import { User, database } from 'firebase';
import { IService } from '../service-base';

export class ExpenseServiceFirebase implements IService<Label> {
    collection = 'labels/';
    db: database.Database = database();
    user: User;

    /**
     *
     */
    constructor(user: User) {
        this.user = user;
    }

    public async getAllYears(groupId: string): Promise<number[]> {
        throw new Error('Method not implemented.');
    }

    public async getAll(groupId: string): Promise<Label[]> {
        throw new Error('Method not implemented.');
    }

    public async get(id: string): Promise<Label> {
        throw new Error('Method not implemented.');
    }

    public async add(obj: Label): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async update(obj: Label): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
