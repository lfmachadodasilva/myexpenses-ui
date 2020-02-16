import { Label } from './label';

export enum ExpenseType {
    Incoming,
    Outcoming
}

export interface Expense {
    id: string;

    name: string;
    value: number;
    type: ExpenseType;
    date: Date;

    groupId: string;
    labelId: string;
}

export interface ExpenseWithDetails extends Expense {
    label: Label;
}
