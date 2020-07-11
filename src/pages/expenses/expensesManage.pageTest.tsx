import React from 'react';

import { BasePage } from '../../helpers/basePageTest';
import { ExpensesManageProps, ExpensesManagePage } from './expensesManage';

export class ExpensesManagePageObject extends BasePage<ExpensesManageProps> {
    defaultParams: Partial<ExpensesManageProps> = {};

    protected initialiseSubComponents(): void {}

    protected render(props: ExpensesManageProps) {
        return <ExpensesManagePage {...props} />;
    }
}
