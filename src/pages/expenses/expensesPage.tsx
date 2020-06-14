import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ManageExpensesPage } from './manageExpensesPage';
import { ListExpensesPage } from './listExpensesPage';

export const ExpensesPage: React.FC = memo(() => {
    return (
        <Switch>
            <Route path={'/expenses/add'} component={ManageExpensesPage} />
            <Route path={'/expenses/edit'} component={ManageExpensesPage} />
            <Route path={'/expenses'} component={ListExpensesPage} />
        </Switch>
    );
});
