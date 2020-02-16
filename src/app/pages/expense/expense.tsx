import React from 'react';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from 'react-router-dom';

import ExpenseAllPage from './expense-all';

const ExpensePage: React.FC<RouteComponentProps> = (props: RouteComponentProps) => (
    <div key='expensePage'>
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                {/* <Route path='/expense/add' component={ExpenseAddEditPage} />
                <Route path='/expense/edit' component={ExpenseAddEditPage} /> */}
                <Route path='/expense' component={ExpenseAllPage} />

                <Route path='*'>
                    <h1> 404 </h1>
                </Route>
            </Switch>
        </Router>
    </div>
);

export default ExpensePage;
