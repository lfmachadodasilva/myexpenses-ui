import React from 'react';

import { TestObjectBase } from '../../helpers/testObjectBase';
import { ExpensePage, ExpenseProps } from './expense';

export class ExpenseTestObject extends TestObjectBase<ExpenseProps> {
    defaultParams: Partial<ExpenseProps> = {};

    protected initialiseSubObjects(): void {}

    protected render(props: ExpenseProps) {
        return <ExpensePage {...props} />;
    }
}
