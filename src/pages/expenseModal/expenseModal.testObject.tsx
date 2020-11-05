import React from 'react';
import { fireEvent } from '@testing-library/react';

import { ModalTestObject } from '../../components/modal/modal.testObject';
import { GlobalContext, globalContext } from '../../contexts/global';
import { TestObjectBase } from '../../helpers/testObjectBase';
import { ExpenseModalPage, ExpenseModalProps } from './expenseModal';

export class ExpenseModalTestObject extends TestObjectBase<ExpenseModalProps> {
    defaultParams: Partial<ExpenseModalProps> = {};
    modalTestObject!: ModalTestObject;
    global!: GlobalContext;

    protected initialiseSubObjects(): void {
        this.modalTestObject = new ModalTestObject();
        this.modalTestObject.initialiseWithParentObject(this.wrapper);
    }

    protected render(props: ExpenseModalProps) {
        return (
            <globalContext.Provider value={this.global}>
                <ExpenseModalPage {...props} />
            </globalContext.Provider>
        );
    }

    insertText(id: string, value: string | string[]) {
        const input = this.getByTestId(id);
        fireEvent.change(input, { target: { value: value } });
    }

    async makeReadyToAdd() {
        this.insertText('expense-name-field', 'New group');
        this.insertText('expense-value-field', '1.1');
        this.insertText('expense-comments-field', 'New comment');
    }
}
