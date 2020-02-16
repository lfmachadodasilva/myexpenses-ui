import { Label, LabelWithDetails } from '../../models/label';
import { User, database } from 'firebase/app';
import { IService } from '../service-base';

export class LabelServiceFirebase implements IService<Label> {
    collection = 'labels/';
    db: database.Database = database();
    user: User;

    constructor(user: User) {
        this.user = user;
    }

    public async getAll(groupId: string): Promise<Label[]> {
        throw new Error('Method not implemented.');
    }

    public async getAllWithDetails(groupId: string): Promise<LabelWithDetails[]> {
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
