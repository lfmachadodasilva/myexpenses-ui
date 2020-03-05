import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import { intersectionWith, map } from 'lodash';
import { User } from '../../models/user';

import { IUserService } from './user.service';
import { ConfigurationManager } from '../../../configuration/manager';

export class UserServiceFirebase implements IUserService {
    config = ConfigurationManager.get();
    collection = 'users/';
    db: firebase.database.Database = firebase.database();

    getAll(): Promise<User[]> {
        const refUser = this.db.ref(this.collection);
        return refUser
            .once('value')
            .then((value: any) => {
                return map(value.val(), (v, i) => {
                    return {
                        ...(v as User),
                        id: i
                    } as User;
                });
            })
            .finally(() => {
                refUser.off();
            });
    }
    get(users: string[]): Promise<User[]> {
        const refUser = this.db.ref(this.collection);
        return refUser
            .once('value')
            .then((value: any) => {
                return intersectionWith(value.val() as User[], users, (a: User, b: string) => {
                    return a.id === b;
                });
            })
            .finally(() => {
                refUser.off();
            });
    }
    saveOrUpdate(user: User): Promise<void> {
        const refUser = this.db.ref('users/' + user.id);
        return refUser
            .once('value')
            .then(value => {
                if (!value.val()) {
                    refUser.set({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    });
                } else {
                    refUser.update({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    });
                }
            })
            .finally(() => {
                refUser.off();
            });
    }
}
