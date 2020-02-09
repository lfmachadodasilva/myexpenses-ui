import * as React from 'react';
import { GroupReducer } from '../reducers/group-reducer';
import { ExpenseReducer } from '../reducers/expense-reducer';

export interface GlobalContext {
    group: string;
    month: number;
    year: number;

    groupReducer: GroupReducer;
    expenseReducer: ExpenseReducer;

    loadingBase: boolean;
}

export const initalGlobalContext: GlobalContext = {
    group: null,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,

    groupReducer: null,
    expenseReducer: null,

    loadingBase: true
};

export const globalContext = React.createContext<GlobalContext>(initalGlobalContext);
