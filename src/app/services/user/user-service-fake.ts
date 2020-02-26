import { ConfigurationManager } from '../../../configuration/manager';
import { IUserService } from './user.service';
import { User } from '../../models/user';
import { hasValue } from '../../helpers/util-helper';

export class UserServiceFake implements IUserService {
    config = ConfigurationManager.get();
    users: User[];
    collection = 'users';

    constructor() {
        this.users = JSON.parse(localStorage.getItem(this.collection)) as User[];
        if (!hasValue(this.users)) {
            this.users = [
                {
                    id: 'prCSRxTzTyRjaeDr9SzlvY6gAEi2',
                    displayName: 'Luiz Felipe Machado da Silva',
                    email: 'silvaaavlis@gmail.com',
                    photoURL: 'https://graph.facebook.com/10216669334500686/picture'
                },
                {
                    id: '13FAoQ4yNNSl7mUJtQgTQpFeWmU2',
                    displayName: null,
                    email: 'user@test.com',
                    photoURL: null
                }
            ] as User[];
            localStorage.setItem(this.collection, JSON.stringify(this.users));
        }
    }

    getAll(): Promise<User[]> {
        return new Promise(resolve => {
            return setTimeout(() => {
                return resolve(this.users);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    get(users: string[]): Promise<User[]> {
        return new Promise(resolve => {
            return setTimeout(() => {
                return resolve(this.users.filter(x => users.some(y => y === x.id)));
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
    saveOrUpdate(user: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
