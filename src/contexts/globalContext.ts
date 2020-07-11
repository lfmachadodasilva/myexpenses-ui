import React from 'react';
import { GroupModel } from '../models/group';
import { LabelModel } from '../models/label';

interface GlobalContext {
    isLoading: boolean;

    groups: GroupModel[];
    labels: LabelModel[];
    years: number[];

    group?: GroupModel;
    month: number;
    year: number;
}

export const globalContext = React.createContext<GlobalContext>({
    isLoading: false,

    groups: [],
    labels: [],
    years: [new Date().getFullYear()],

    month: new Date().getMonth(),
    year: new Date().getFullYear()
});
