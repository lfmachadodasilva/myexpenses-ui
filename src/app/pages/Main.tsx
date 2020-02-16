import { Redirect, Switch, Route } from 'react-router';
import React from 'react';
import { Container } from 'react-bootstrap';

import { useSession } from '../services/auth-service';
import { MyRoute } from '../route';
import ExpensePage from './expense/expense';
import LabelPage from './label/label';
import LoginRegisterPage from './auth/login-register';
import LogoutPage from './auth/logout';
import GroupPage from './group/group';

interface PrivateRouteProps {
    component: any;
    path?: string;
}

const PrivateRoute = ({ component: Component, path, ...other }: PrivateRouteProps) => {
    const user = useSession();
    return user ? <Component /> : <Redirect to='/login-register' />;
};

const Main: React.FC = () => {
    // TODO manage query
    // const global = useContext(globalContext);
    // const { user } = useContext(userContext);
    // const location = useLocation();
    // const search = queryString.parse(location.search);
    // const jsonString = JSON.stringify(search);
    // const objJsonString = JSON.parse(jsonString) as Search;
    // console.log(user, global, search, jsonString, objJsonString);

    return (
        <Container>
            <Switch>
                <PrivateRoute path={MyRoute.GROUP} component={GroupPage} />
                <PrivateRoute path={MyRoute.LABEL} component={LabelPage} />
                <PrivateRoute path={MyRoute.EXPENSE} component={ExpensePage} />

                <Route path={MyRoute.LOGIN_REGISTER} component={LoginRegisterPage} />
                <Route path={MyRoute.LOGOUT} component={LogoutPage} />

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
    );
};

export default Main;
