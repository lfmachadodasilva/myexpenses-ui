import React from 'react';
import { GroupModel } from '../models/group';

interface GlobalContext {
    isLoading: boolean;

    groups: GroupModel[];
    years: number[];

    group?: GroupModel;
    month: number;
    year: number;
}

export const globalContext = React.createContext<GlobalContext>({
    isLoading: false,

    groups: [],
    years: [new Date().getFullYear()],

    month: new Date().getMonth(),
    year: new Date().getFullYear()
});
