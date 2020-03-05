import React, { useState } from 'react';
import { useContext } from 'react';

import { userContext } from '../contexts/user-context';
import firebase from 'firebase/app';
import 'firebase/auth'; // If using Firebase auth

export const useAuth = () => {
    const [state, setState] = useState(() => {
        const user = firebase.auth().currentUser;
        return { initialising: !user, user };
    });

    function onChange(user: firebase.User) {
        setState({ initialising: false, user });
    }

    React.useEffect(() => {
        // listen for auth state changes
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
        // unsubscribe to the listener when unmounting
        return () => unsubscribe();
    }, []);

    return state;
};

export const useSession = () => {
    const { user } = useContext(userContext);
    return user;
};

// const google = new firebase.auth.GoogleAuthProvider();

// export const loginWithGoogle = async () => {
//     try {
//         const result = await firebase.auth().signInWithPopup(google);
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// };

// const github = new firebase.auth.GithubAuthProvider();

// export const loginWithGithub = async () => {
//     try {
//         const result = await firebase.auth().signInWithPopup(github);
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// };

const facebook = new firebase.auth.FacebookAuthProvider();

export const loginWithFacebook = async () => {
    try {
        return await firebase.auth().signInWithPopup(facebook);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const loginWithEmail = async (email: string, password: string) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const createUserWithEmail = async (email: string, password: string) => {
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const resetPassword = async (email: string) => {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const signOut = () => firebase.auth().signOut();
