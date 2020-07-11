import { GroupModel } from './group';
import { LabelModel } from './label';

export enum ExpenseType {
    Incoming,
    Outcoming
}

export interface ExpenseModel {
    id: number;
    name: string;

    type: ExpenseType;
    value: number;
    date: Date;
    comments: string;

    labelId: number;
    groupId: number;
}

export interface ExpenseFullModel {
    id: number;
    name: string;

    type: ExpenseType;
    value: number;
    date: Date;
    comments: string;

    label: LabelModel;
    group: GroupModel;
}
