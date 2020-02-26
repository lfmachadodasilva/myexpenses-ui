import { User, database } from 'firebase/app';
import { orderBy } from 'lodash';

import { IGroupService } from './group-service';
import { Group } from '../../models/group';
import { UserService } from '../user/user.service';

export class GroupServiceFirebase implements IGroupService {
    user: User;
    collection = 'groups/';
    db: database.Database = database();

    /**
     * Constructor
     */
    constructor(user: User) {
        this.user = user;
    }

    async getAll(): Promise<Group[]> {
        const refUser = this.db.ref(this.collection);
        return refUser
            .once('value')
            .then((value: any) => {
                const obj = value.val();
                return obj ? this.filterGroupByUser(Object.keys(obj).map(i => obj[i])) : [];
            })
            .finally(() => {
                refUser.off();
            });
    }
    async getAllWithDetails(): Promise<Group[]> {
        const groupsPromise = this.getAll();
        const usersPrimise = new UserService().getAll();
        const [groups, users] = await Promise.all([groupsPromise, usersPrimise]);
        return orderBy(
            groups.map(group => {
                return {
                    ...group,
                    users: (group.users as string[]).map(x => users.find(y => x === y.id))
                };
            }),
            ['name']
        );
    }

    async get(id: string): Promise<Group> {
        const refUser = this.db.ref(this.collection + id);
        return refUser
            .once('value')
            .then((value: any) => {
                return { ...value.val() } as Group;
            })
            .finally(() => {
                refUser.off();
            });
    }

    async getWithDetails(id: string): Promise<Group> {
        const users = await new UserService().getAll();
        const refUser = this.db.ref(this.collection + id);
        return refUser
            .once('value')
            .then((value: any) => {
                const group = value.val() as Group;
                return {
                    ...group,
                    users: (group.users as string[]).map(x => users.find(y => x === y.id))
                } as Group;
            })
            .finally(() => {
                refUser.off();
            });
    }

    async add(obj: Group): Promise<void> {
        const newRef = await this.db.ref(this.collection).push();
        return newRef.set({ ...obj, id: newRef.key }).finally(() => {
            newRef.off();
        });
    }

    async update(obj: Group): Promise<void> {
        const group = await this.get(obj.id);
        return new Promise((resolve, reject) => {
            if ((group.users as string[]).some(x => x === this.user.uid)) {
                const refUser = database().ref(this.collection + obj.id);
                return refUser.update(obj).finally(() => {
                    refUser.off();
                    resolve();
                });
            } else {
                // this group does not belong to the current user
                reject();
            }
        });
    }

    async delete(id: string): Promise<void> {
        const group = await this.get(id);
        return new Promise((resolve, reject) => {
            if ((group.users as string[]).some(x => x === this.user.uid)) {
                const refUser = this.db.ref(this.collection + id);
                return refUser.remove().finally(() => {
                    refUser.off();
                    resolve();
                });
            } else {
                // this group does not belong to the current user
                reject();
            }
        });
    }

    private filterGroupByUser(groups: Group[]): Group[] {
        return groups
            ? orderBy(
                  groups.filter(group => (group.users as string[]).some(userId => userId === this.user.uid)),
                  ['name']
              )
            : [];
    }
}
