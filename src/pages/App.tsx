import React, { memo } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import './App.scss';
import { Header } from '../components/header/header';
import { ExpensesPage } from './expenses/expensesPage';

const Application: React.FC = memo(() => {
    return (
        <>
            <Header />
            <Container maxWidth="md">
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Switch>
                        <Route path={'/expenses'} component={ExpensesPage} />

                        <Route exact path="/">
                            <>
                                <h1> HOME </h1>
                                <h3> TODO </h3>
                            </>
                        </Route>
                        <Route path="*">
                            <h1> 404 </h1>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Container>
        </>
    );
});

export const App = Application;
