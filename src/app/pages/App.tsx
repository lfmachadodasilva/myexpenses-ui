import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.scss';
import { HeaderComponent } from '../components/header/header';
import { LabelPage } from './label/label';
import { ExpensePage } from './expense/expense';

const App: React.FC = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className='App'>
                <HeaderComponent />
                <Container>
                    <Switch>
                        <Route path='/expense'>
                            <ExpensePage />
                        </Route>
                        <Route path='/label'>
                            <LabelPage />
                        </Route>
                        <Route exact path='/'>
                            <>
                                <h1> HOME </h1>
                                <h3> myexpenses home page </h3>
                            </>
                        </Route>
                        <Route path='*'>
                            <h1> 404 </h1>
                        </Route>
                    </Switch>
                </Container>
            </div>
        </Router>
    );
};

export default App;
