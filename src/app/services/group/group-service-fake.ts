import { Group } from '../../models/group';
import { IService } from '../service-base';
import { ConfigurationManager } from '../../../configuration/manager';

export class GroupServiceFake implements IService<Group> {
    collection = 'groups';
    groups: Group[];
    config = ConfigurationManager.get();

    /**
     *
     */
    constructor() {
        this.groups = JSON.parse(localStorage.getItem(this.collection)) as Group[];
        if (this.groups === null || this.groups.length === 0) {
            this.groups = [
                {
                    id: '1',
                    name: 'Group 1'
                },
                {
                    id: '2',
                    name: 'Group 2'
                },
                {
                    id: '3',
                    name: 'Group 3'
                }
            ] as Group[];
            localStorage.setItem(this.collection, JSON.stringify(this.groups));
        }
    }

    getAll(groupId: string = ''): Promise<Group[]> {
        return new Promise(resolve => {
            return setTimeout(() => {
                resolve(this.groups);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
    get(id: string): Promise<Group> {
        return new Promise(resolve => {
            resolve(this.groups.find(x => x.id === id));
        });
    }
    add(obj: Group): Promise<void> {
        return new Promise(resolve => {
            this.groups.push(obj);
            resolve();
        });
    }
    update(obj: Group): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
