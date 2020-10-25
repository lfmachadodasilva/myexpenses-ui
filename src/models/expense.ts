import { LabelModel } from './label';

export interface ExpenseModel {
    id: number;
    name: string;

    // value: number;
    // date: Date;

    // /** relations */
    // groupId: number;
    // labelId: number;
}

export interface ExpenseFullModel {
    id: number;
    name: string;

    value: number;
    date: Date;

    /** relations */
    groupId: number;
    label: LabelModel;
}
