import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import axios from 'axios';

import HeaderComponent, { HeaderSimpleComponent } from '../components/header/header';
import { userContext } from '../contexts/user-context';
import Main from './Main';

import { UserService } from '../services/user/user.service';
import { firebaseApp } from '../..';
import { hasValue } from '../helpers/util-helper';
import { ConfigurationManager } from '../../configuration/manager';

const App: React.FC = () => {
    const [user, initialising] = useAuthState(firebase.auth(firebaseApp));

    useEffect(() => {
        if (initialising || !user) {
            return;
        }

        if (hasValue(user)) {
            axios.defaults.baseURL = ConfigurationManager.get().apiUrl;
            user.getIdTokenResult().then((value: any) => {
                axios.defaults.headers.common['Authorization'] = value.token;
            });
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            new UserService().saveOrUpdate({
                id: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            });
        }
    }, [user, initialising]);

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
                            <Main />
                        </Router>
                    </>
                )}
            </div>
        </userContext.Provider>
    );
};
export default App;
