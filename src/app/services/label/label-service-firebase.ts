import { sumBy, meanBy, orderBy } from 'lodash';
import { addMonths, addDays, compareAsc } from 'date-fns';
import { User, database } from 'firebase/app';

import { ILabelService } from './label-service';

import { Label, LabelWithDetails } from '../../models/label';
import { ExpenseService } from '../expense/expense-service';
import { Expense } from '../../models/expense';

export class LabelServiceFirebase implements ILabelService {
    collection = 'labels/';
    db: database.Database = database();
    user: User;

    constructor(user: User) {
        this.user = user;
    }

    getAll(groupId: string): Promise<Label[]> {
        const ref = this.db.ref(this.collection);
        return ref.once('value').then(value => {
            ref.off();

            const data = value.val();
            if (data) {
                const labels = Object.keys(data).map(i => data[i]) as Label[];
                return orderBy(
                    labels.filter(label => label.groupId === groupId),
                    ['name']
                );
            }

            return [];
        });
    }
    async getAllWithDetails(groupId: string, month: number, year: number): Promise<LabelWithDetails[]> {
        const ref = this.db.ref(this.collection);
        const expenses = await new ExpenseService(this.user).getAll(groupId);

        return ref.once('value').then(value => {
            ref.off();

            const data = value.val();
            if (data) {
                const labels = Object.keys(data).map(i => data[i]) as Label[];
                return orderBy(
                    labels
                        .filter(label => label.groupId === groupId)
                        .map(label => {
                            const [currentValue, lastMonthValue, averageValue] = this.getLabelValues(
                                label.id,
                                expenses,
                                year,
                                month
                            );
                            return {
                                ...label,
                                currentValue: currentValue,
                                lastMonthValue: lastMonthValue,
                                averageValue: averageValue
                            } as LabelWithDetails;
                        }),
                    ['name']
                );
            }

            return [];
        });
    }
    get(id: string): Promise<Label> {
        const ref = this.db.ref(this.collection + id);
        return ref
            .once('value')
            .then((value: any) => {
                return { ...value.val() } as Label;
            })
            .finally(() => {
                ref.off();
            });
    }
    getWithDetails(id: string): Promise<LabelWithDetails> {
        const ref = this.db.ref(this.collection + id);
        return ref
            .once('value')
            .then(async (value: any) => {
                const label = { ...value.val() } as Label;
                const expenses = await new ExpenseService(this.user).getAll(label.groupId);
                const today = new Date();
                const [currentValue, lastMonthValue, averageValue] = this.getLabelValues(
                    label.id,
                    expenses,
                    today.getFullYear(),
                    today.getMonth() + 1
                );
                return {
                    ...label,
                    currentValue: currentValue,
                    lastMonthValue: lastMonthValue,
                    averageValue: averageValue
                } as LabelWithDetails;
            })
            .finally(() => {
                ref.off();
            });
    }
    async add(obj: Label): Promise<void> {
        const ref = await this.db.ref(this.collection).push();
        return ref.set({ ...obj, id: ref.key }).finally(() => {
            ref.off();
        });
    }
    update(obj: Label): Promise<void> {
        const ref = database().ref(this.collection + obj.id);
        return ref.update(obj).finally(() => {
            ref.off();
        });
    }
    delete(id: string): Promise<void> {
        const ref = database().ref(this.collection + id);
        return ref.remove().finally(() => {
            ref.off();
        });
    }

    private getLabelValues(labelId: string, expenses: Expense[], year: number, month: number) {
        const expensesByLabel = expenses.filter(expense => expense.labelId === labelId);
        const current = new Date(year, month - 1);
        const currentValue = sumBy(
            expensesByLabel.filter(
                expense =>
                    expense.date.getFullYear() === current.getFullYear() &&
                    expense.date.getMonth() === current.getMonth()
            ),
            expense => expense.value
        );
        const lastMonth = addMonths(current, -1);
        const lastMonthValue = sumBy(
            expensesByLabel.filter(
                expense =>
                    expense.date.getFullYear() === lastMonth.getFullYear() &&
                    expense.date.getMonth() === lastMonth.getMonth()
            ),
            expense => expense.value
        );
        const lastDayOfPreviousMonth = addDays(new Date(current.getFullYear(), current.getMonth(), 1), -1);
        const averageValue = meanBy(
            expensesByLabel.filter(expense => compareAsc(expense.date, lastDayOfPreviousMonth) <= 0),
            expense => expense.value
        );

        return [currentValue, lastMonthValue, averageValue];
    }
}
