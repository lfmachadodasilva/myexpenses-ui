import { parse } from 'date-fns';
import { ExpenseFullModel, ExpenseType } from '../models/expense';

export const csvToExpenses = (
    group: number,
    data: string,
    splitByRow: string,
    splitByCol: string,
    dateFormat: string
): ExpenseFullModel[] => {
    let tmpExpenses: ExpenseFullModel[] = [];

    try {
        data.split(splitByRow).forEach(row => {
            const col = row.split(splitByCol);

            if (col.length < 5) {
                return;
            }

            tmpExpenses.push({
                id: 0,
                type: +col[0] as ExpenseType,
                name: col[1],
                value: +col[2],
                date: parse(col[3], dateFormat, new Date()),
                label: {
                    id: 0,
                    name: col[4],
                    groupId: group
                },
                groupId: group,
                comments: col[5]
            });
        });
    } catch {
        return [];
    }

    return tmpExpenses;
};
