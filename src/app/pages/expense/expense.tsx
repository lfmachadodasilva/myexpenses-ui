import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ExpenseAllPage from './expense-all';
import ExpenseAddEditPage from './expense-add-edit';
import { MyRoute } from '../../route';

const ExpensePage: React.FC = () => (
    <Switch>
        <Route path={MyRoute.EXPENSE_ADD} component={ExpenseAddEditPage} />
        <Route path={MyRoute.EXPENSE_EDIT} component={ExpenseAddEditPage} />
        <Route path={MyRoute.EXPENSE} component={ExpenseAllPage} />

        <Route path='*'>
            <h1> 404 </h1>
        </Route>
    </Switch>
);

export default ExpensePage;
