import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ExpenseAddEditPage } from './expenseAddEdit';
import { ExpenseAllPage } from './expenseAll';

export class ExpensePage extends React.Component {
    render(): React.ReactNode {
        return (
            <div key='expensePage'>
                <Router basename={process.env.PUBLIC_URL}>
                    <Switch>
                        <Route exact path='/expense/add' component={ExpenseAddEditPage} />
                        <Route exact path='/expense/edit' component={ExpenseAddEditPage} />
                        <Route path='/expense' component={ExpenseAllPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
