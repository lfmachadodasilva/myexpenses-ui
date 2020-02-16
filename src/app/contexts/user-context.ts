import * as React from 'react';
import { User } from 'firebase/app';

interface UserContext {
    user?: User;
    initialising?: boolean;
}

export const userContext = React.createContext<UserContext>({
    user: undefined
});
