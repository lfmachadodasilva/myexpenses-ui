import { auth, User } from 'firebase';
// import 'firebase/auth'; // If using Firebase auth

import { UserService } from './user';
import { UserModel } from '../models/user';
import { ConfigModel } from '../models/config';

export const loginWithFacebook = async () => {
    const facebook = new auth.FacebookAuthProvider();

    try {
        return await auth().signInWithPopup(facebook);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const loginWithEmail = async (email: string, password: string) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const createUserWithEmail = async (email: string, password: string) => {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const resetPassword = async (email: string) => {
    try {
        return await auth().sendPasswordResetEmail(email);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateUser = async (config: ConfigModel, user: User, displayName: string) => {
    try {
        await user?.updateProfile({ displayName: displayName });

        await new UserService(config).addOrUpdate({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoUrl: user.photoURL
        } as UserModel);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const signOut = () => auth().signOut();
