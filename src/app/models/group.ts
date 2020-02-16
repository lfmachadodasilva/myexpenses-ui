import { User } from './user';

export interface Group {
    id: string;
    name: string;

    users: User[] | string[];
}
