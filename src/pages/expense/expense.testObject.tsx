import React from 'react';

import { ItemTestObject } from '../../components/item/item.testObject';
import { globalContext, GlobalContext } from '../../contexts/global';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { ExpenseModalTestObject } from '../expenseModal/expenseModal.testObject';
import { ExpensePage, ExpenseProps } from './expense';

export class ExpenseTestObject extends TestObjectBase<ExpenseProps> {
    defaultParams: Partial<ExpenseProps> = {};

    global!: GlobalContext;

    modalObject!: ExpenseModalTestObject;
    itemObject!: ItemTestObject;

    protected initialiseSubObjects(): void {
        this.modalObject = new ExpenseModalTestObject();
        this.modalObject.initialiseWithParentObject(this.wrapper);

        this.itemObject = new ItemTestObject();
        this.itemObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: ExpenseProps) {
        return (
            <globalContext.Provider value={{ ...this.global }}>
                <ExpensePage {...props} />
            </globalContext.Provider>
        );
    }

    clickAdd() {
        this.clickByText('Add new expense');
    }
}
