import React from 'react';
import { User } from 'firebase';

export type UserContext = {
    user?: User | null;
    initialising: boolean;
    isReady: boolean;

    isDarkTheme: boolean;
    setDarkTheme: (dark: boolean) => void;
};

export const defaultUserContext: UserContext = {
    initialising: false,
    isReady: false,

    isDarkTheme: false,
    setDarkTheme: (dark: boolean) => {}
};

export const userContext = React.createContext<UserContext>(defaultUserContext);
