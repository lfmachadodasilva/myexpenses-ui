import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ExpenseAddEditPage } from './expenseAddEdit';
import { ExpenseAllPage } from './expenseAll';

export class ExpensePage extends React.Component {
    render(): React.ReactNode {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <h1> Expense Page </h1>
                <Switch>
                    <Route path='/expense' exact strict>
                        <ExpenseAllPage />
                    </Route>
                    <Route path='/expense/add'>
                        <ExpenseAddEditPage />
                    </Route>
                    <Route path='/expense/edit'>
                        <ExpenseAddEditPage />
                    </Route>
                </Switch>
            </Router>
        );
    }
}
