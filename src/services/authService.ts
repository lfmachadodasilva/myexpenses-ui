import React, { useState } from 'react';
import firebase, { auth } from 'firebase/app';
import 'firebase/auth'; // If using Firebase auth

export const useAuth = () => {
    const [state, setState] = useState(() => {
        const user = auth().currentUser;
        return { initialising: !user, user };
    });

    const onChange = (user: firebase.User | null) => {
        setState({ initialising: false, user });
    };

    React.useEffect(() => {
        // listen for auth state changes
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
        // unsubscribe to the listener when unmounting
        return () => unsubscribe();
    }, []);

    return state;
};

const facebook = new auth.FacebookAuthProvider();

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
        return await firebase.auth().sendPasswordResetEmail(email);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const signOut = () => firebase.auth().signOut();
