import { fireEvent, wait } from '@testing-library/react';
import React from 'react';
import { GlobalContext, globalContext } from '../../contexts/global';
import { userContext } from '../../contexts/user';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { ExpenseModalPage, ExpenseModalProps } from './expenseModal';

export class ExpenseModalTestObject extends TestObjectBase<ExpenseModalProps> {
    defaultParams: Partial<ExpenseModalProps> = {};
    global!: GlobalContext;

    protected initialiseSubObjects(): void {}

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

    clickAdd() {
        this.clickByText('Add');
    }

    clickEdit() {
        this.clickByText('Edit');
    }

    clickDuplicate() {
        this.clickByText('Duplicate');
    }

    clickClose() {
        fireEvent.click(this.CloseButton as Element);
    }

    async waitModalToShow() {
        await wait(() => expect(this.Modal).toBeInTheDocument());
    }

    async waitModalToHide() {
        await wait(() => expect(this.Modal).not.toBeInTheDocument());
    }

    get Modal() {
        return this.querySelector('.modal-content');
    }

    get CloseButton() {
        return this.querySelector('.close');
    }
}
