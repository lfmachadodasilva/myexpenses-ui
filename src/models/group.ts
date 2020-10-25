import { UserModel } from './user';

export interface GroupModel {
    id: number;
    name: string;

    /** relations */
    users: string[];
}

export interface GroupFullModel {
    id: number;
    name: string;

    /** relations */
    users: UserModel[];
}
