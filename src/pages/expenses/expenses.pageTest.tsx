import React from 'react';

import { BasePage } from '../../helpers/basePageTest';
import { ExpensesProps, ExpensesPage } from './expenses';

export class ExpensesPageObject extends BasePage<ExpensesProps> {
    defaultParams: Partial<ExpensesProps> = {};

    protected initialiseSubComponents(): void {}

    protected render(props: ExpensesProps) {
        return <ExpensesPage {...props} />;
    }
}
