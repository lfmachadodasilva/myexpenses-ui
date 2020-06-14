import { GroupModel } from './labelModel';

export interface LabelModel {
    id: number;
    name: string;

    group: GroupModel;
}
