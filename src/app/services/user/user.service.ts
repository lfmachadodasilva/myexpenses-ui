import { ConfigurationManager } from '../../../configuration/manager';
import { User } from '../../models/user';
import { UserServiceFake } from './user-service-fake';
import { UserServiceFirebase } from './user-service-firebase';

export interface IUserService {
    getAll(): Promise<User[]>;
    get(users: string[]): Promise<User[]>;
    saveOrUpdate(user: User): Promise<void>;
}

export class UserService implements IUserService {
    config = ConfigurationManager.get();

    // const refUser = database().ref('users/' + user.uid);
    //     refUser
    //         .once('value')
    //         .then(value => {
    //             if (!value.val()) {
    //                 refUser.set({
    //                     displayName: user.displayName,
    //                     email: user.email,
    //                     photoURL: user.photoURL
    //                 });
    //             } else {
    //                 refUser.update({
    //                     displayName: user.displayName,
    //                     email: user.email,
    //                     photoURL: user.photoURL
    //                 });
    //             }
    //         })
    //         .finally(() => {
    //             refUser.off();
    //         });

    /**
     * Get all users
     */
    public async getAll(): Promise<User[]> {
        if (this.config.enableFakeDatabase) {
            const service = new UserServiceFake();
            return service.getAll();
        } else if (this.config.enableFirebaseDatabase) {
            const service = new UserServiceFirebase();
            return service.getAll();
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }

    /**
     * Get all labels
     */
    public async get(users: string[]): Promise<User[]> {
        if (this.config.enableFakeDatabase) {
            const service = new UserServiceFake();
            return service.get(users);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new UserServiceFirebase();
            return service.get(users);
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }

    /**
     * Save or update
     */
    public async saveOrUpdate(user: User): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new UserServiceFake();
            return service.saveOrUpdate(user);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new UserServiceFirebase();
            return service.saveOrUpdate(user);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }
}
