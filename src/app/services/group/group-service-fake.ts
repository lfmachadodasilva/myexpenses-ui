import { User } from 'firebase';

import { Group } from '../../models/group';
import { ConfigurationManager } from '../../../configuration/manager';
import { IGroupService } from './group-service';
import { UserService } from '../user/user.service';

export class GroupServiceFake implements IGroupService {
    user: User;
    collection = 'groups';
    groups: Group[];
    config = ConfigurationManager.get();

    constructor(user: User) {
        this.user = user;
        this.groups = JSON.parse(localStorage.getItem(this.collection)) as Group[];
        if (this.groups === null || this.groups.length === 0) {
            this.groups = [
                {
                    id: '1',
                    name: 'Group 1',
                    users: [
                        // facebook account
                        'prCSRxTzTyRjaeDr9SzlvY6gAEi2',
                        // email fake account
                        '13FAoQ4yNNSl7mUJtQgTQpFeWmU2'
                    ]
                },
                {
                    id: '2',
                    name: 'Group 2',
                    users: [
                        // facebook account
                        'prCSRxTzTyRjaeDr9SzlvY6gAEi2'
                    ]
                },
                {
                    id: '3',
                    name: 'Group 3',
                    users: [
                        // email fake account
                        '13FAoQ4yNNSl7mUJtQgTQpFeWmU2'
                    ]
                }
            ] as Group[];
            localStorage.setItem(this.collection, JSON.stringify(this.groups));
        }
    }

    async getAll(): Promise<Group[]> {
        const groups = this.groups.filter(x => (x.users as string[]).some(y => y === this.user.uid));
        return new Promise(resolve => {
            return setTimeout(() => {
                resolve(groups);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async getAllWithDetails(): Promise<Group[]> {
        const groups = this.groups.filter(x => (x.users as string[]).some(y => y === this.user.uid));
        const users = await new UserService().get([].concat(...groups.map(x => x.users as string[])));
        return new Promise(resolve => {
            return setTimeout(() => {
                resolve(
                    groups.map(group => {
                        return {
                            ...group,
                            users: (group.users as string[]).map(x => users.find(y => x === y.id))
                        };
                    })
                );
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async get(id: string): Promise<Group> {
        const group = this.groups.find(x => x.id === id && (x.users as string[]).some(y => y === this.user.uid));
        return new Promise(resolve => {
            return setTimeout(() => {
                resolve(group);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async getWithDetails(id: string): Promise<Group> {
        const group = this.groups.find(x => x.id === id && (x.users as string[]).some(y => y === this.user.uid));
        const users = await new UserService().get(group.users as string[]);
        return new Promise(resolve => {
            return setTimeout(() => {
                resolve({
                    ...group,
                    users: (group.users as string[]).map(x => users.find(y => x === y.id))
                });
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async add(obj: Group): Promise<void> {
        return new Promise(resolve => {
            return setTimeout(() => {
                const max = Math.max.apply(
                    Math,
                    this.groups.map(x => +x.id)
                );
                this.groups.push({
                    ...obj,
                    id: (max + 1).toString()
                } as Group);
                localStorage.setItem(this.collection, JSON.stringify(this.groups));
                resolve();
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async update(obj: Group): Promise<void> {
        return new Promise((resolve, reject) => {
            const group = this.groups.find(x => x.id === obj.id);
            if (group === null || group === undefined) {
                return reject('You do not have access to this user');
            }

            return setTimeout(() => {
                this.groups = this.groups.filter(x => x.id !== obj.id);
                this.groups.push(obj);
                localStorage.setItem(this.collection, JSON.stringify(this.groups));
                return resolve();
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                const group = this.groups.find(x => x.id === id);
                if (group === null || group === undefined) {
                    return reject('You do not have access to this user');
                }

                return setTimeout(() => {
                    this.groups = this.groups.filter(x => x.id !== id);
                    localStorage.setItem(this.collection, JSON.stringify(this.groups));
                    return resolve();
                }, this.config.enableFakeDatabaseTimeout);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
}
