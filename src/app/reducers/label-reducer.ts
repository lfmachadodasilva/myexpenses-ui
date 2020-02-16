import { useReducer, useCallback } from 'react';
import { User } from 'firebase/app';

import { FetchData } from '../services/fetch-data';
import { FetchStatus } from '../services/fetch-status';
import { Label, LabelWithDetails } from '../models/label';
import { LabelService } from '../services/label/label-service';

enum LabelActionType {
    LOADED = 'LABEL_LOADED',
    LOADING = 'LABEL_LOADING',
    ERROR = 'LABEL_ERROR',
    RESET = 'RESET'
}

enum LabelWithDetailsActionType {
    LOADED = 'LABEL_WITH_DETAILS_LOADED',
    LOADING = 'LABEL_WITH_DETAILS_LOADING',
    ERROR = 'LABEL_WITH_DETAILS_ERROR',
    RESET = 'LABEL_WITH_DETAILS_RESET'
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
interface LabelWithDetailsActionLoaded {
    type: LabelWithDetailsActionType.LOADED;
    payload: LabelWithDetails[];
}
interface LabelWithDetailsActionLoading {
    type: LabelWithDetailsActionType.LOADING;
}
interface LabelWithDetailsActionError {
    type: LabelWithDetailsActionType.ERROR;
    payload: string;
}
interface LabelWithDetailsActionReset {
    type: LabelWithDetailsActionType.RESET;
}

type LabelWithDetailsAction =
    | LabelWithDetailsActionLoaded
    | LabelWithDetailsActionLoading
    | LabelWithDetailsActionError
    | LabelWithDetailsActionReset;
type LabelAction =
    | LabelActionLoaded
    | LabelActionLoading
    | LabelActionError
    | LabelActionReset
    | LabelWithDetailsAction;

interface LabelState {
    labels: FetchData<Label[]>;
    labelsWithDetails: FetchData<LabelWithDetails[]>;
}

export type LabelReducer = {
    state: LabelState;
    getLabels: () => Promise<Label[]>;
    resetLabels: () => void;
    getLabelsWithDetails: (groupId: string, year: number, month: number) => Promise<void>;
    resetLabelsWithDetails: () => void;
};

export const useLabelReducer = (user: User, groupId: string): LabelReducer => {
    const initialState = {
        labels: {
            status: FetchStatus.Ready,
            data: null
        },
        labelsWithDetails: {
            status: FetchStatus.Ready,
            data: null
        }
    } as LabelState;

    function reducer(state: LabelState = initialState, action: LabelAction) {
        // console.log(state, action);

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

            case LabelWithDetailsActionType.LOADING:
                return {
                    ...state,
                    labelsWithDetails: {
                        status: FetchStatus.Loading,
                        data: null
                    }
                };
            case LabelWithDetailsActionType.LOADED:
                return {
                    ...state,
                    labelsWithDetails: {
                        status: FetchStatus.Loaded,
                        data: action.payload
                    }
                };
            case LabelWithDetailsActionType.ERROR:
                return {
                    ...state,
                    labelsWithDetails: {
                        status: FetchStatus.Error,
                        data: null
                    }
                };
            case LabelWithDetailsActionType.RESET:
                return {
                    ...state,
                    labelsWithDetails: initialState.labelsWithDetails
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
    }, [groupId, user, dispatch]);

    const getLabelsWithDetails = useCallback(
        async (groupId: string, year: number, month: number) => {
            dispatch({
                type: LabelWithDetailsActionType.LOADING
            } as LabelAction);

            return new LabelService(user)
                .getAllWithDetails(groupId, year, month)
                .then(data => {
                    dispatch({
                        type: LabelWithDetailsActionType.LOADED,
                        payload: data
                    });
                })
                .catch(e => {
                    dispatch({
                        type: LabelWithDetailsActionType.ERROR,
                        payload: e.toString()
                    });
                });
        },
        [user, dispatch]
    );

    const resetLabels = useCallback(() => {
        dispatch({
            type: LabelActionType.RESET
        } as LabelAction);
    }, [dispatch]);

    const resetLabelsWithDetails = useCallback(() => {
        dispatch({
            type: LabelWithDetailsActionType.RESET
        } as LabelAction);
    }, [dispatch]);

    return { state, getLabels, resetLabels, getLabelsWithDetails, resetLabelsWithDetails };
};
