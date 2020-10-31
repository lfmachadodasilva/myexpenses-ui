import React from 'react';
import { GroupModel } from '../models/group';
import { LabelModel } from '../models/label';

export interface GlobalContext {
    isLoading: boolean;

    labels: LabelModel[];

    groups: GroupModel[];
    years: number[];

    group: number;
    month: number;
    year: number;

    reload: () => void;
}

export const defaultGlobalContext: GlobalContext = {
    isLoading: true,

    labels: [],

    groups: [],
    years: [],

    group: 0,
    month: 1,
    year: 2020,

    reload: () => {}
};

export const globalContext = React.createContext<GlobalContext>(defaultGlobalContext);
