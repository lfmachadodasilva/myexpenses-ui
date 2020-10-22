import { GroupFullModel, GroupModel } from '../models/group';
import { usersMockData } from './user';

export const groupsMockData: GroupModel[] = [
    { id: 1, name: 'Group 1', users: usersMockData.map(x => x.id) },
    { id: 2, name: 'Group 2', users: usersMockData.map(x => x.id) },
    { id: 3, name: 'Group 3', users: usersMockData.map(x => x.id) },
    { id: 4, name: 'Group 4', users: usersMockData.map(x => x.id) }
];

export const groupsFullMockData: GroupFullModel[] = [
    { id: 1, name: 'Group 1', users: usersMockData },
    { id: 2, name: 'Group 2', users: usersMockData },
    { id: 3, name: 'Group 3', users: usersMockData },
    { id: 4, name: 'Group 4', users: usersMockData }
];
