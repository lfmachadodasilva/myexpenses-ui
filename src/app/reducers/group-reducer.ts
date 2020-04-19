import { FetchData } from '../services/fetch-data';
import { Group } from '../models/group';
import { FetchStatus } from '../services/fetch-status';
import { useReducer, Dispatch, useCallback } from 'react';
import { GroupService } from '../services/group/group-service';
import { User } from 'firebase/app';

enum GroupActionType {
    LOADED = 'GROUP_LOADED',
    LOADING = 'GROUP_LOADING',
    ERROR = 'GROUP_ERROR',
    RESET = 'RESET',

    LOADED_WITH_DETAILS = 'GROUP_WITH_DETAILS_LOADED',
    LOADING_WITH_DETAILS = 'GROUP_WITH_DETAILS_LOADING',
    ERROR_WITH_DETAILS = 'GROUP_WITH_DETAILS_ERROR',
    RESET_WITH_DETAILS = 'RESET_WITH_DETAILS',
}

interface GroupActionLoaded {
    type: GroupActionType.LOADED | GroupActionType.LOADED_WITH_DETAILS;
    payload: Group[];
}
interface GroupActionLoading {
    type: GroupActionType.LOADING | GroupActionType.LOADING_WITH_DETAILS;
}
interface GroupActionError {
    type: GroupActionType.ERROR | GroupActionType.ERROR_WITH_DETAILS;
    payload: string;
}
interface GroupActionReset {
    type: GroupActionType.RESET | GroupActionType.RESET_WITH_DETAILS;
}
type GroupAction = GroupActionLoaded | GroupActionLoading | GroupActionError | GroupActionReset;

interface GroupState {
    groups: FetchData<Group[]>;
    groupsWithDetails: FetchData<Group[]>;
}

export type GroupReducer = {
    state: GroupState;
    dispatch: Dispatch<GroupAction>;
    getGroups: () => Promise<Group[]>;
    getGroupsWithDetails: () => Promise<Group[]>;
    resetGroupsWithDetails: () => Promise<void>;
};

export const useGroupReducer = (user: User): GroupReducer => {
    const initialState = {
        groups: {
            status: FetchStatus.Ready,
            data: null,
        },
        groupsWithDetails: {
            status: FetchStatus.Ready,
            data: null,
        },
    } as GroupState;

    function reducer(state: GroupState = initialState, action: GroupAction) {
        console.log(state, action);
        switch (action.type) {
            case GroupActionType.LOADING:
                return {
                    ...state,
                    groups: {
                        status: FetchStatus.Loading,
                        data: [] as Group[],
                    },
                };
            case GroupActionType.LOADED:
                return {
                    ...state,
                    groups: {
                        status: FetchStatus.Loaded,
                        data: action.payload,
                    },
                };
            case GroupActionType.ERROR:
                return {
                    ...state,
                    groups: {
                        status: FetchStatus.Error,
                        data: null,
                    },
                };
            case GroupActionType.RESET:
                return {
                    ...state,
                    groups: initialState.groups,
                };
            case GroupActionType.LOADING_WITH_DETAILS:
                return {
                    ...state,
                    groupsWithDetails: {
                        status: FetchStatus.Loading,
                        data: [] as Group[],
                    },
                };
            case GroupActionType.LOADED_WITH_DETAILS:
                return {
                    ...state,
                    groupsWithDetails: {
                        status: FetchStatus.Loaded,
                        data: action.payload,
                    },
                };
            case GroupActionType.ERROR_WITH_DETAILS:
                return {
                    ...state,
                    groupsWithDetails: {
                        status: FetchStatus.Error,
                        data: null,
                    },
                };
            case GroupActionType.RESET_WITH_DETAILS:
                return {
                    ...state,
                    groupsWithDetails: initialState.groupsWithDetails,
                };
            default:
                return initialState;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const getGroups = useCallback(async () => {
        dispatch({
            type: GroupActionType.LOADING,
        } as GroupAction);

        return new GroupService(user)
            .getAll()
            .then(data => {
                dispatch({
                    type: GroupActionType.LOADED,
                    payload: data,
                });
                return data;
            })
            .catch(e => {
                dispatch({
                    type: GroupActionType.ERROR,
                    payload: e.toString(),
                });
                return [] as Group[];
            });
    }, [user, dispatch]);

    const getGroupsWithDetails = useCallback(async () => {
        dispatch({
            type: GroupActionType.LOADING_WITH_DETAILS,
        } as GroupAction);

        return new GroupService(user)
            .getAllWithDetails()
            .then(data => {
                dispatch({
                    type: GroupActionType.LOADED_WITH_DETAILS,
                    payload: data,
                });
                return data;
            })
            .catch(e => {
                dispatch({
                    type: GroupActionType.ERROR_WITH_DETAILS,
                    payload: e.toString(),
                });
                return [] as Group[];
            });
    }, [user, dispatch]);

    const resetGroupsWithDetails = useCallback(async () => {
        dispatch({
            type: GroupActionType.RESET_WITH_DETAILS,
        } as GroupAction);
    }, [dispatch]);

    return { state, dispatch, getGroups, getGroupsWithDetails, resetGroupsWithDetails };
};
