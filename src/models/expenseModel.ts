import { GroupModel } from './labelModel';
import { LabelModel } from './groupModel';

export interface ExpenseModel {
    id: number;
    name: string;

    label: LabelModel;
    group: GroupModel;
}
