import { useReducer, Dispatch, useCallback } from 'react';
import { User } from 'firebase/app';

import { FetchData } from '../services/fetch-data';
import { FetchStatus } from '../services/fetch-status';
import { ExpenseService } from '../services/expense/expense-service';

enum ExpenseActionType {
    LOADED = 'EXPENSE_LOADED',
    LOADING = 'EXPENSE_LOADING',
    ERROR = 'EXPENSE_ERROR',
    RESET = 'RESET'
}

interface ExpenseActionLoaded {
    type: ExpenseActionType.LOADED;
    payload: number[];
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
type ExpenseAction = ExpenseActionLoaded | ExpenseActionLoading | ExpenseActionError | ExpenseActionReset;

interface ExpenseState {
    years: FetchData<number[]>;
}

export type ExpenseReducer = {
    state: ExpenseState;
    dispatch: Dispatch<ExpenseAction>;
    getExpensesYears: () => Promise<number[]>;
};

export const useExpenseReducer = (user: User, groupId: string): ExpenseReducer => {
    const initialState = {
        years: {
            status: FetchStatus.Ready,
            data: null
        }
    } as ExpenseState;

    function reducer(state: ExpenseState = initialState, action: ExpenseAction) {
        switch (action.type) {
            case ExpenseActionType.LOADING:
                return {
                    ...state,
                    years: {
                        status: FetchStatus.Loading,
                        data: [] as number[]
                    }
                };
            case ExpenseActionType.LOADED:
                return {
                    ...state,
                    years: {
                        status: FetchStatus.Loaded,
                        data: action.payload
                    }
                };
            case ExpenseActionType.ERROR:
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

    const getExpensesYears = useCallback(async () => {
        if (groupId !== null && groupId !== null) {
            dispatch({
                type: ExpenseActionType.LOADING
            } as ExpenseAction);

            return new ExpenseService(user)
                .getAllYears(groupId)
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
        }
    }, [user, dispatch, groupId]);

    return { state, dispatch, getExpensesYears };
};
