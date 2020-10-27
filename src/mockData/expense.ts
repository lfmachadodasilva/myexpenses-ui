import { ExpenseFullModel, ExpenseModel, ExpenseType } from '../models/expense';
import { groupsMockData } from './group';
import { labelsMockData } from './label';

export const expensesMockData: ExpenseModel[] = [
    {
        id: 1,
        name: 'Expense 1',
        type: ExpenseType.OUTCOMING,
        value: 1.11,
        date: new Date(2020, 0, 1),
        comments: 'Comments 1',
        groupId: groupsMockData[0].id,
        labelId: labelsMockData[0].id
    },
    {
        id: 2,
        name: 'Expense 2',
        type: ExpenseType.OUTCOMING,
        value: 2.11,
        date: new Date(),
        comments: 'Comments 2',
        groupId: groupsMockData[0].id,
        labelId: labelsMockData[1].id
    },
    {
        id: 3,
        name: 'Expense 3',
        type: ExpenseType.INCOMING,
        value: 3.11,
        date: new Date(),
        comments: 'Comments 3',
        groupId: groupsMockData[0].id,
        labelId: labelsMockData[2].id
    },
    {
        id: 4,
        name: 'Expense 4',
        type: ExpenseType.INCOMING,
        value: 4.11,
        date: new Date(),
        comments: 'Comments 3',
        groupId: groupsMockData[0].id,
        labelId: labelsMockData[3].id
    }
];

export const expensesFullMockData: ExpenseFullModel[] = [
    {
        id: 1,
        name: 'Expense 1',
        type: ExpenseType.OUTCOMING,
        value: 1.11,
        date: new Date(2020, 0, 1),
        comments: 'Comments 1',
        groupId: groupsMockData[0].id,
        label: labelsMockData[0]
    },
    {
        id: 2,
        name: 'Expense 2',
        type: ExpenseType.OUTCOMING,
        value: 2.11,
        date: new Date(),
        comments: 'Comments 2',
        groupId: groupsMockData[0].id,
        label: labelsMockData[1]
    },
    {
        id: 3,
        name: 'Expense 3',
        type: ExpenseType.INCOMING,
        value: 3.11,
        date: new Date(),
        comments: 'Comments 3',
        groupId: groupsMockData[0].id,
        label: labelsMockData[2]
    },
    {
        id: 4,
        name: 'Expense 4',
        type: ExpenseType.INCOMING,
        value: 4.11,
        date: new Date(),
        comments: 'Comments 4',
        groupId: groupsMockData[0].id,
        label: labelsMockData[3]
    }
];

export const yearsMockData: number[] = [2015, 2016, 2017, 2018, 2019, 2020];
