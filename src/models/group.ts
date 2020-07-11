import { UserModel } from './user';

export interface GroupModel {
    id: number;
    name: string;
}

export interface GroupFullModel {
    id: number;
    name: string;

    users: UserModel[];
}