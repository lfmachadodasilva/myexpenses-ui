import { useReducer, useCallback } from 'react';
import { User } from 'firebase/app';

import { FetchData } from '../services/fetch-data';
import { FetchStatus } from '../services/fetch-status';
import { ExpenseService } from '../services/expense/expense-service';
import { ExpenseWithDetails } from '../models/expense';

enum YearActionType {
    LOADED = 'YEAR_LOADED',
    LOADING = 'YEAR_LOADING',
    ERROR = 'YEAR_ERROR',
    RESET = 'YEAR_RESET'
}

enum ExpenseActionType {
    LOADED = 'EXPENSE_LOADED',
    LOADING = 'EXPENSE_LOADING',
    ERROR = 'EXPENSE_ERROR',
    RESET = 'EXPENSE_RESET'
}

interface YearActionLoaded {
    type: YearActionType.LOADED;
    payload: number[];
}
interface YearActionLoading {
    type: YearActionType.LOADING;
}
interface YearActionError {
    type: YearActionType.ERROR;
    payload: string;
}
interface YearActionReset {
    type: YearActionType.RESET;
}
type YearAction = YearActionLoaded | YearActionLoading | YearActionError | YearActionReset;

interface ExpenseActionLoaded {
    type: ExpenseActionType.LOADED;
    payload: ExpenseWithDetails[];
}
interface ExpenseActionLoading {
    type: ExpenseActionType.LOADING;
}
interface ExpenseActionError {
    type: ExpenseActionType.ERROR;
    payload: string;
}
interface ExpenseActionReset {
    type: ExpenseActionType.RESET;
}
type ExpenseAction = ExpenseActionLoaded | ExpenseActionLoading | ExpenseActionError | ExpenseActionReset | YearAction;

interface ExpenseState {
    years: FetchData<number[]>;
    expenses: FetchData<ExpenseWithDetails[]>;
}

export type ExpenseReducer = {
    state: ExpenseState;
    getExpensesYears: (groupId: string) => Promise<number[]>;
    getExpenses: (groupId: string, month: number, year: number) => Promise<ExpenseWithDetails[]>;
    resetExpenses: () => void;
};

export const useExpenseReducer = (user: User): ExpenseReducer => {
    const initialState = {
        years: {
            status: FetchStatus.Ready,
            data: null
        },
        expenses: {
            status: FetchStatus.Ready,
            data: null
        }
    } as ExpenseState;

    function reducer(state: ExpenseState = initialState, action: ExpenseAction) {
        console.log(state, action);

        switch (action.type) {
            case ExpenseActionType.LOADING:
                return {
                    ...state,
                    expenses: {
                        status: FetchStatus.Loading,
                        data: [] as ExpenseWithDetails[]
                    }
                };
            case ExpenseActionType.LOADED:
                return {
                    ...state,
                    expenses: {
                        status: FetchStatus.Loaded,
                        data: action.payload
                    }
                };
            case ExpenseActionType.ERROR:
                return {
                    ...state,
                    expenses: {
                        status: FetchStatus.Error,
                        data: null
                    }
                };
            case ExpenseActionType.RESET:
                return {
                    ...state,
                    expenses: initialState.expenses
                };

            case YearActionType.LOADING:
                return {
                    ...state,
                    years: {
                        status: FetchStatus.Loading,
                        data: [] as number[]
                    }
                };
            case YearActionType.LOADED:
                return {
                    ...state,
                    years: {
                        status: FetchStatus.Loaded,
                        data: action.payload
                    }
                };
            case YearActionType.ERROR:
                return {
                    ...state,
                    years: {
                        status: FetchStatus.Error,
                        data: null
                    }
                };
            default:
                return initialState;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const getExpensesYears = useCallback(
        async (groupId: string) => {
            if (groupId !== null && groupId !== null) {
                dispatch({
                    type: YearActionType.LOADING
                } as ExpenseAction);

                return new ExpenseService(user)
                    .getAllYears(groupId)
                    .then(data => {
                        dispatch({
                            type: YearActionType.LOADED,
                            payload: data
                        });
                        return data;
                    })
                    .catch(e => {
                        dispatch({
                            type: YearActionType.ERROR,
                            payload: e.toString()
                        });
                        return [];
                    });
            }
        },
        [user, dispatch]
    );

    const getExpenses = useCallback(
        async (groupId: string, month: number, year: number) => {
            dispatch({
                type: ExpenseActionType.LOADING
            } as ExpenseAction);

            return new ExpenseService(user)
                .getAllWithDetails(groupId, month, year)
                .then(data => {
                    dispatch({
                        type: ExpenseActionType.LOADED,
                        payload: data
                    });
                    return data;
                })
                .catch(e => {
                    dispatch({
                        type: ExpenseActionType.ERROR,
                        payload: e.toString()
                    });
                    return [];
                });
        },
        [user, dispatch]
    );

    const resetExpenses = useCallback(async () => {
        dispatch({
            type: ExpenseActionType.RESET
        } as ExpenseAction);
    }, [dispatch]);

    return { state, getExpensesYears, getExpenses, resetExpenses };
};
