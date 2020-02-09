import { User } from 'firebase';
import { Group } from '../../models/group';
import { IService } from '../service-base';
import { AppConfig } from '../../../configuration/app-config';
import { ConfigurationManager } from '../../../configuration/manager';
import { GroupServiceFake } from './group-service-fake';
import { GroupServiceFirebase } from './group-service-firebase';

export class GroupService implements IService<Group> {
    user: User;
    config: AppConfig;

    /**
     * Constructor
     */
    constructor(user: User) {
        this.user = user;
        this.config = ConfigurationManager.get();
    }

    public async getAll(groupId: string = ''): Promise<Group[]> {
        if (this.config.enableFakeDatabase) {
            const service = new GroupServiceFake();
            return service.getAll(groupId);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new GroupServiceFirebase(this.user);
            return service.getAll(groupId);
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
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
