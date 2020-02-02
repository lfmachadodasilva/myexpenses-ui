import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';

import './App.scss';
import { LabelPage } from './label/label';
import { ExpensePage } from './expense/expense';
import HeaderComponent from '../components/header/header';
import { useSession } from '../auth';
import { userContext } from '../contexts/user-context';
import LoginRegisterPage from './auth/login-register';
import LogoutPage from './auth/logout';
import { auth } from 'firebase';

interface PrivateRouteProps {
    component: any;
    path?: string;
}

const PrivateRoute = ({ component: Component, path, ...other }: PrivateRouteProps) => {
    const user = useSession();

    if (!user) {
        return <Redirect to='/login-register' />;
    }

    if (!user) {
        return null;
    }

    return <Component />;
};

const App: React.FC = () => {
    const [user, initialising] = useAuthState(auth());

    return (
        <userContext.Provider
            value={{
                user: user,
                initialising: initialising
            }}
        >
            <Router basename={process.env.PUBLIC_URL}>
                <div className='App'>
                    {initialising && (
                        <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                    )}
                    {!initialising && (
                        <>
                            <HeaderComponent />
                            <Container>
                                <Switch>
                                    <PrivateRoute path='/expense' component={ExpensePage} />
                                    <PrivateRoute path='/label' component={LabelPage} />
                                    <Route path='/login-register' component={LoginRegisterPage} />
                                    <Route path='/logout' component={LogoutPage} />

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
                        </>
                    )}
                </div>
            </Router>
        </userContext.Provider>
    );
};
export default App;
