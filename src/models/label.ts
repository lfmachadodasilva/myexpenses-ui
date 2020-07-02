import { GroupModel } from './group';

export interface LabelModel {
    id: number;
    name: string;

    group: GroupModel;
}
