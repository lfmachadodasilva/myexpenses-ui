import { Redirect, Switch, Route, useLocation, useHistory } from 'react-router';
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import queryString from 'query-string';

import { useSession } from '../services/auth-service';
import { MyRoute } from '../route';
import ExpensePage from './expense/expense';
import LabelPage from './label/label';
import LoginRegisterPage from './auth/login-register';
import LogoutPage from './auth/logout';
import GroupPage from './group/group';
import { globalContext, initalGlobalContext } from '../contexts/global-context';
import { useGroupReducer } from '../reducers/group-reducer';
import { useExpenseReducer } from '../reducers/expense-reducer';
import { useLabelReducer } from '../reducers/label-reducer';
import { userContext } from '../contexts/user-context';
import { hasValue } from '../helpers/util-helper';
import { FetchStatus } from '../services/fetch-status';
import { Search } from '../models/search';
import { LocalStorageHelper } from '../helpers/localStorage-helper';

interface PrivateRouteProps {
    component: any;
    path?: string;
}

const PrivateRoute = ({ component: Component, path, ...other }: PrivateRouteProps) => {
    const user = useSession();
    return user ? <Component /> : <Redirect to='/login-register' />;
};

const Main: React.FC = () => {
    const location = useLocation();
    const history = useHistory();

    const { user } = useContext(userContext);

    const groupReducer = useGroupReducer(user);
    const {
        state: { groups },
        getGroups,
    } = groupReducer;

    const [loadingBase, setLoadingBase] = useState(true);
    const [group, setGroup] = useState<string>();
    const [month, setMonth] = useState<number>();
    const [year, setYear] = useState(initalGlobalContext.year);

    const expenseReducer = useExpenseReducer(user);
    const {
        state: { years },
        getExpensesYears,
    } = expenseReducer;

    const labelReducer = useLabelReducer(user, group);

    useEffect(() => {
        if (!hasValue(user)) {
            return;
        }
        getGroups();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchParms = useMemo(() => {
        const jsonString = JSON.stringify(queryString.parse(location.search));
        return JSON.parse(jsonString) as Search;
    }, [location.search]);

    useEffect(() => {
        if (groups.status !== FetchStatus.Loaded) {
            return;
        }

        setLoadingBase(true);

        let selectedGroup: string;

        if (!hasValue(searchParms.group)) {
            selectedGroup = LocalStorageHelper.getGroup(groups.data);
            history.push({
                pathname: location.pathname,
                search: queryString.stringify({
                    group: selectedGroup,
                    month: searchParms.month,
                    year: searchParms.year,
                }),
            });

            return;
        }

        if (hasValue(searchParms.group) && groups.data.some(x => x.id === searchParms.group)) {
            // get from url query
            selectedGroup = groups.data.find(x => x.id === searchParms.group).id;
        } else {
            // group from query is invalid

            // get from local storage or the first available
            selectedGroup = LocalStorageHelper.getGroup(groups.data);
            history.push({
                pathname: location.pathname,
                search: queryString.stringify({
                    group: selectedGroup,
                    month: searchParms.month,
                    year: searchParms.year,
                }),
            });
        }
        setGroup(selectedGroup);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groups.status, groups.data, searchParms.group]);

    useEffect(() => {
        if (groups.status !== FetchStatus.Loaded || !hasValue(group)) {
            return;
        }

        if (hasValue(searchParms.month) && searchParms.month > 0 && searchParms.month <= 12) {
            setMonth(searchParms.month);
            return;
        }

        const currentMonth = hasValue(searchParms.month) ? searchParms.month : new Date().getMonth() + 1;
        setMonth(currentMonth);
        if (searchParms.month !== currentMonth) {
            history.push({
                pathname: location.pathname,
                search: queryString.stringify({
                    group: searchParms.group,
                    month: currentMonth,
                    year: searchParms.year,
                }),
            });
        }
        console.log('selected month');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [group, month, groups.status, history, searchParms.group, searchParms.month]);

    useEffect(() => {
        if (hasValue(group)) {
            setLoadingBase(true);
            getExpensesYears(group);
        }
    }, [group, getExpensesYears]);

    useEffect(() => {
        if (years.status !== FetchStatus.Loaded) {
            return;
        }

        let selectedYear = new Date().getFullYear();

        if (
            hasValue(searchParms.year) &&
            hasValue(years.data.length) &&
            !years.data.some(x => x === searchParms.year)
        ) {
            // get from url
            selectedYear = searchParms.year;
        } else {
            // check if the current year is available
            // if not, select next year available
            if (hasValue(years.data.length) && !years.data.some(x => x === selectedYear)) {
                selectedYear = years.data.sort((a, b) => (a > b ? 1 : -1))[0];
            }

            history.push({
                pathname: location.pathname,
                search: queryString.stringify({
                    group: searchParms.group,
                    month: searchParms.month,
                    year: selectedYear,
                }),
            });
        }
        setYear(selectedYear);
        setLoadingBase(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [years.data, years.status, searchParms.year]);

    return (
        <globalContext.Provider
            value={{
                ...initalGlobalContext,
                group: group,
                year: year,
                month: month,
                groupReducer: groupReducer,
                expenseReducer: expenseReducer,
                labelReducer: labelReducer,
                loadingBase: loadingBase,
            }}
        >
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
        </globalContext.Provider>
    );
};

export default Main;
