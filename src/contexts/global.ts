import React from 'react';
import { GroupModel } from '../models/group';

export interface GlobalContext {
    isLoading: boolean;

    groups: GroupModel[];
    years: number[];

    group: number;
    month: number;
    year: number;
}

export const globalContext = React.createContext<GlobalContext>({
    isLoading: true,

    groups: [],
    years: [],

    group: 0,
    month: 0,
    year: 0
});
