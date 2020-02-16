import { useReducer, Dispatch, useCallback } from 'react';
import { User } from 'firebase/app';

import { FetchData } from '../services/fetch-data';
import { FetchStatus } from '../services/fetch-status';
import { Label } from '../models/label';
import { LabelService } from '../services/label/label-service';

enum LabelActionType {
    LOADED = 'LABEL_LOADED',
    LOADING = 'LABEL_LOADING',
    ERROR = 'LABEL_ERROR',
    RESET = 'RESET'
}

interface LabelActionLoaded {
    type: LabelActionType.LOADED;
    payload: Label[];
}
interface LabelActionLoading {
    type: LabelActionType.LOADING;
}
interface LabelActionError {
    type: LabelActionType.ERROR;
    payload: string;
}
interface LabelActionReset {
    type: LabelActionType.RESET;
}
type LabelAction = LabelActionLoaded | LabelActionLoading | LabelActionError | LabelActionReset;

interface LabelState {
    labels: FetchData<Label[]>;
}

export type LabelReducer = {
    state: LabelState;
    dispatch: Dispatch<LabelAction>;
    getLabels: () => Promise<Label[]>;
};

export const useLabelReducer = (user: User, groupId: string): LabelReducer => {
    const initialState = {
        labels: {
            status: FetchStatus.Ready,
            data: null
        }
    } as LabelState;

    function reducer(state: LabelState = initialState, action: LabelAction) {
        switch (action.type) {
            case LabelActionType.LOADING:
                return {
                    ...state,
                    labels: {
                        status: FetchStatus.Loading,
                        data: [] as Label[]
                    }
                };
            case LabelActionType.LOADED:
                return {
                    ...state,
                    labels: {
                        status: FetchStatus.Loaded,
                        data: action.payload
                    }
                };
            case LabelActionType.ERROR:
                return {
                    ...state,
                    labels: {
                        status: FetchStatus.Error,
                        data: null
                    }
                };
            default:
                return initialState;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const getLabels = useCallback(async () => {
        dispatch({
            type: LabelActionType.LOADING
        } as LabelAction);

        return new LabelService(user)
            .getAll(groupId)
            .then(data => {
                dispatch({
                    type: LabelActionType.LOADED,
                    payload: data
                });
                return data;
            })
            .catch(e => {
                dispatch({
                    type: LabelActionType.ERROR,
                    payload: e.toString()
                });
                return null;
            });
    }, [user, dispatch]);

    return { state, dispatch, getLabels };
};
