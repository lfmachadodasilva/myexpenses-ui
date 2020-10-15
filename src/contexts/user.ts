import React from 'react';
import { User } from 'firebase/app';

interface UserContext {
    user: User | null;
    initialising: boolean;
    isReady: boolean;
}

export const userContext = React.createContext<UserContext>({
    user: null,
    initialising: false,
    isReady: false
});
