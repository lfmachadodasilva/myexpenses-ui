import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.scss';
import { HeaderComponent } from '../components/header/header';
import { LabelPage } from './label/label';
import { ExpensePage } from './expense/expense';

const App: React.FC = () => {
    return (
        <Router>
            <div className='App'>
                <HeaderComponent />
                <Container>
                    <Switch>
                        <Route path='/expense'>
                            <ExpensePage />
                        </Route>
                        {/* <Route path='/expense/add'>
                            <ExpenseAddEditPage />
                        </Route> */}
                        {/* <Route path='/expense/edit'>
                            <ExpenseAddEditPage />
                        </Route> */}
                        <Route path='/label'>
                            <LabelPage />
                        </Route>
                        <Route path='/'>
                            <h1> HOME </h1>
                        </Route>
                    </Switch>
                </Container>
            </div>
        </Router>
    );
};

export default App;
