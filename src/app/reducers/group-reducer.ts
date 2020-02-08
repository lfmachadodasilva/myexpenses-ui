import { FetchData } from '../services/fetch-data';
import { Group } from '../models/group';
import { FetchStatus } from '../services/fetch-status';
import { useReducer, Dispatch, useCallback } from 'react';
import { GroupService } from '../services/group/group-service';
import { User } from 'firebase';

enum GroupActionType {
    LOADED = 'GROUP_LOADED',
    LOADING = 'GROUP_LOADING',
    ERROR = 'GROUP_ERROR',
    RESET = 'RESET'
}

interface GroupActionLoaded {
    type: GroupActionType.LOADED;
    payload: Group[];
}
interface GroupActionLoading {
    type: GroupActionType.LOADING;
}
interface GroupActionError {
    type: GroupActionType.ERROR;
    payload: string;
}
interface GroupActionReset {
    type: GroupActionType.RESET;
}
type GroupAction = GroupActionLoaded | GroupActionLoading | GroupActionError | GroupActionReset;

interface GroupState {
    groups: FetchData<Group[]>;
}

export type GroupReducer = {
    state: GroupState;
    dispatch: Dispatch<GroupAction>;
    getGroups: () => Promise<Group[]>;
};

export const useGroupReducer = (user: User): GroupReducer => {
    const initialState = {
        groups: {
            status: FetchStatus.Ready,
            data: null
        }
    } as GroupState;

    function reducer(state: GroupState = initialState, action: GroupAction) {
        console.log(state, action);
        switch (action.type) {
            case GroupActionType.LOADING:
                return {
                    ...state,
                    groups: {
                        status: FetchStatus.Loading,
                        data: [] as Group[]
                    }
                };
            case GroupActionType.LOADED:
                return {
                    ...state,
                    groups: {
                        status: FetchStatus.Loaded,
                        data: action.payload
                    }
                };
            case GroupActionType.ERROR:
                return {
                    ...state,
                    groups: {
                        status: FetchStatus.Error,
                        data: null
                    }
                };
            default:
                return initialState;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const getGroups = useCallback(async () => {
        dispatch({
            type: GroupActionType.LOADING
        } as GroupAction);

        return new GroupService(user)
            .getAll()
            .then(data => {
                dispatch({
                    type: GroupActionType.LOADED,
                    payload: data
                });
                return data;
            })
            .catch(e => {
                dispatch({
                    type: GroupActionType.ERROR,
                    payload: e.toString()
                });
                return [] as Group[];
            });
    }, [user, dispatch]);

    return { state, dispatch, getGroups };
};
