import { User, firestore } from 'firebase';
import { Group } from '../../models/group';
import { firebaseApp } from '../../..';
import { IService } from '../service-base';

export class GroupServiceFirebase implements IService<Group> {
    user: User;
    collection = 'groups';
    db: firestore.Firestore;

    /**
     * Constructor
     */
    constructor(user: User) {
        this.user = user;
        this.db = firestore(firebaseApp);
    }

    public async getAll(groupId: string = ''): Promise<Group[]> {
        throw new Error('Method not implemented.');
    }
    public async get(id: string): Promise<Group> {
        throw new Error('Method not implemented.');
    }
    public async add(obj: Group): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async update(obj: Group): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
