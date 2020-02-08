import { FetchStatus } from './fetch-status';

export interface FetchData<T> {
    data: T;
    status: FetchStatus;
}
