import { User } from 'firebase/app';

import { Group } from '../../models/group';
import { AppConfig } from '../../../configuration/app-config';
import { ConfigurationManager } from '../../../configuration/manager';
import { GroupServiceFake } from './group-service-fake';
import { GroupServiceFirebase } from './group-service-firebase';

export interface IGroupService {
    getAll(): Promise<Group[]>;
    getAllWithDetails(): Promise<Group[]>;
    get(id: string): Promise<Group>;
    getWithDetails(id: string): Promise<Group>;
    add(obj: Group): Promise<void>;
    update(obj: Group): Promise<void>;
    delete(id: string): Promise<void>;
}

export class GroupService implements IGroupService {
    user: User;
    config: AppConfig;

    /**
     * Constructor
     */
    constructor(user: User) {
        this.user = user;
        this.config = ConfigurationManager.get();
    }

    async getAll(): Promise<Group[]> {
        if (this.config.enableFakeDatabase) {
            const service = new GroupServiceFake(this.user);
            return service.getAll();
        } else if (this.config.enableFirebaseDatabase) {
            const service = new GroupServiceFirebase(this.user);
            return service.getAll();
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }

    async getAllWithDetails(): Promise<Group[]> {
        if (this.config.enableFakeDatabase) {
            const service = new GroupServiceFake(this.user);
            return service.getAllWithDetails();
        } else if (this.config.enableFirebaseDatabase) {
            const service = new GroupServiceFirebase(this.user);
            return service.getAllWithDetails();
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }

    async get(id: string): Promise<Group> {
        if (this.config.enableFakeDatabase) {
            const service = new GroupServiceFake(this.user);
            return service.get(id);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new GroupServiceFirebase(this.user);
            return service.get(id);
        }

        return new Promise(resolve => {
            // TODO
            resolve({} as Group);
        });
    }

    async getWithDetails(id: string): Promise<Group> {
        if (this.config.enableFakeDatabase) {
            const service = new GroupServiceFake(this.user);
            return service.getWithDetails(id);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new GroupServiceFirebase(this.user);
            return service.getWithDetails(id);
        }

        return new Promise(resolve => {
            // TODO
            resolve({} as Group);
        });
    }

    async add(obj: Group): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new GroupServiceFake(this.user);
            return service.add(obj);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new GroupServiceFirebase(this.user);
            return service.add(obj);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }

    async update(obj: Group): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new GroupServiceFake(this.user);
            return service.update(obj);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new GroupServiceFirebase(this.user);
            return service.update(obj);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }

    async delete(id: string): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new GroupServiceFake(this.user);
            return service.delete(id);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new GroupServiceFirebase(this.user);
            return service.delete(id);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }
}
