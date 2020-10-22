import { UserModel } from '../models/user';
import { hasValue } from './util';

export const getUserDisplayName = (user: firebase.User | UserModel) => {
    if (!hasValue(user)) {
        return '';
    }

    if (hasValue(user.displayName)) {
        return user.displayName?.split(' ')[0];
    }

    return user.email?.split('@')[0];
};
