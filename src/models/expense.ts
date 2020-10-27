import { LabelModel } from './label';

export enum ExpenseType {
    INCOMING = 1,
    OUTCOMING
}

export interface ExpenseModel {
    id: number;
    name: string;

    type: ExpenseType;

    value: number;
    date: Date;
    comments: string;

    /** relations */
    groupId: number;
    labelId: number;
}

export interface ExpenseFullModel {
    id: number;
    name: string;

    type: ExpenseType;

    value: number;
    date: Date;
    comments: string;

    /** relations */
    groupId: number;
    label: LabelModel;
}
