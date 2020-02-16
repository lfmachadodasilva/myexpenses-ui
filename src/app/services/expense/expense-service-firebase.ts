import { User, database } from 'firebase/app';
import { IExpenseService } from './expense-service';
import { Expense, ExpenseWithDetails } from '../../models/expense';
import { uniq } from 'lodash';
import { format, parse } from 'date-fns';
import { LabelService } from '../label/label-service';

export class ExpenseServiceFirebase implements IExpenseService {
    dateFormat = 'yyyyMMdd';
    collection = 'expenses/';
    db: database.Database = database();
    user: User;

    /**
     *
     */
    constructor(user: User) {
        this.user = user;
    }

    getAllYears(groupId: string): Promise<number[]> {
        const ref = this.db.ref(this.collection);
        return ref.once('value').then(value => {
            ref.off();

            const data = value.val();
            if (data) {
                const expenses = Object.keys(data).map(i => {
                    return { ...data[i], date: parse(data[i].date.toString(), this.dateFormat, new Date()) };
                }) as Expense[];
                const years = uniq(
                    expenses.filter(expense => expense.groupId === groupId).map(x => x.date.getFullYear())
                );
                return years.length === 0 ? [new Date().getFullYear()] : years;
            }

            return [];
        });
    }
    getAll(groupId: string): Promise<Expense[]> {
        const ref = this.db.ref(this.collection);
        return ref.once('value').then(value => {
            ref.off();

            const data = value.val();
            if (data) {
                const expenses = Object.keys(data).map(i => {
                    return { ...data[i], date: parse(data[i].date.toString(), this.dateFormat, new Date()) };
                }) as Expense[];
                return expenses
                    .filter(expense => expense.groupId === groupId)
                    .map(expense => {
                        return { ...expense, date: parse(expense.date.toString(), this.dateFormat, new Date()) };
                    });
            }

            return [];
        });
    }
    async getAllWithDetails(groupId: string, month: number, year: number): Promise<ExpenseWithDetails[]> {
        const labelsPromise = new LabelService(this.user).getAll(groupId);

        const ref = this.db.ref(this.collection);
        return ref.once('value').then(async value => {
            ref.off();

            const labels = await labelsPromise;

            const data = value.val();
            if (data !== null && data !== undefined) {
                const expenses = Object.keys(data).map(i => {
                    return { ...data[i], date: parse(data[i].date.toString(), this.dateFormat, new Date()) };
                }) as Expense[];

                return expenses
                    .filter(
                        expense =>
                            expense.groupId === groupId &&
                            expense.date.getMonth() + 1 === month &&
                            expense.date.getFullYear()
                    )
                    .map(expense => {
                        return {
                            ...expense,
                            label: labels.find(label => label.id === expense.labelId)
                        };
                    }) as ExpenseWithDetails[];
            }

            return [];
        });
    }
    get(id: string): Promise<Expense> {
        const ref = this.db.ref(this.collection + id);
        return ref
            .once('value')
            .then((value: any) => {
                const obj = value.val();
                return { ...obj, date: parse(obj.date.toString(), this.dateFormat, new Date()) } as Expense;
            })
            .finally(() => {
                ref.off();
            });
    }
    getWithDetails(id: string): Promise<ExpenseWithDetails> {
        const ref = this.db.ref(this.collection + id);
        return ref
            .once('value')
            .then(async (value: any) => {
                const expense = { ...value.val() } as Expense;
                const label = await new LabelService(this.user).get(expense.labelId);

                return { ...expense, label: label } as ExpenseWithDetails;
            })
            .finally(() => {
                ref.off();
            });
    }
    async add(obj: Expense): Promise<void> {
        const ref = await this.db.ref(this.collection).push();
        return ref.set({ ...obj, id: ref.key, date: format(obj.date, this.dateFormat) }).finally(() => {
            ref.off();
        });
    }
    update(obj: Expense): Promise<void> {
        const ref = this.db.ref(this.collection + obj.id);
        return ref.update({ ...obj, date: format(obj.date, this.dateFormat) }).finally(() => {
            ref.off();
        });
    }
    delete(id: string): Promise<void> {
        const ref = this.db.ref(this.collection + id);
        return ref.remove(() => ref.off());
    }
}
