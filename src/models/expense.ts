import { GroupModel } from './group';
import { LabelModel } from './label';

export interface ExpenseModel {
    id: number;
    name: string;

    label: LabelModel;
    group: GroupModel;
}
