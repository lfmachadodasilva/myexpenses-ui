import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'firebase/app';

import HeaderComponent, { HeaderSimpleComponent } from '../components/header/header';
import { userContext } from '../contexts/user-context';
import { globalContext, initalGlobalContext } from '../contexts/global-context';
import { useGroupReducer } from '../reducers/group-reducer';
import { LocalStorageHelper } from '../helpers/localStorage-helper';
import { useExpenseReducer } from '../reducers/expense-reducer';
import Main from './Main';
import { FetchStatus } from '../services/fetch-status';
import { UserService } from '../services/user/user.service';
import { useLabelReducer } from '../reducers/label-reducer';
import { firebaseApp } from '../..';

const App: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const [user, initialising] = useAuthState(auth(firebaseApp));
    const groupReducer = useGroupReducer(user);

    const { state, getGroups } = groupReducer;
    const { groups } = state;
    const [loadingBase, setLoadingBase] = useState(true);
    const [group, setGroup] = useState('');
    const [year, setYear] = useState(currentYear);

    const expenseReducer = useExpenseReducer(user, group);
    const { getExpensesYears } = expenseReducer;

    const labelReducer = useLabelReducer(user, group);

    useEffect(() => {
        if (initialising || !user) {
            return;
        }

        new UserService().saveOrUpdate({
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL
        });
    }, [user, initialising]);

    // run after retrieve user information
    useEffect(() => {
        !initialising &&
            user &&
            groups.status === FetchStatus.Ready &&
            getGroups().then(data => {
                // define the current group
                setGroup(LocalStorageHelper.getGroup(data));

                // get available years
                getExpensesYears().then(years => {
                    // check if the current year is available
                    if (years.length > 0 && !years.some(x => x === currentYear)) {
                        // if not, select next year available
                        setYear(years.sort((a, b) => (a > b ? 1 : -1))[0]);
                    }

                    setLoadingBase(false);
                });
            });
    }, [initialising, user, groups, getGroups, getExpensesYears, currentYear]);

    return (
        <userContext.Provider
            value={{
                user: user,
                initialising: initialising
            }}
        >
            <div className='App'>
                {initialising && <HeaderSimpleComponent />}
                {!initialising && (
                    <>
                        <Router basename={process.env.PUBLIC_URL}>
                            <HeaderComponent />
                            <globalContext.Provider
                                value={{
                                    ...initalGlobalContext,
                                    group: group,
                                    year: year,
                                    groupReducer: groupReducer,
                                    expenseReducer: expenseReducer,
                                    labelReducer: labelReducer,
                                    loadingBase: loadingBase
                                }}
                            >
                                <Main />
                            </globalContext.Provider>
                        </Router>
                    </>
                )}
            </div>
        </userContext.Provider>
    );
};
export default App;
